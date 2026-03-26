import Company from "./Company.ts";
import assert from "../assertions.ts";
import db from "./connection.ts";
import {getHasher} from "./ConnectionForHashing.ts";
import type Hashing from "./Hashing.ts";

/**
 * Represents a user account in the system.
 *
 * An Account stores the username and password (hashed) and is used for
 * authentication (sign in and sign up). Each account is associated with
 * one Company.
 */
export default class Account{
    #username:string
    #password:string
    #company?: Company;

    constructor(username:string,pass:string){
        this.#username = username;
        this.#password = pass;

        if(this.#username.length == 0){
            throw new InvalidUsernameException();
        }
        if(this.#password.length == 0){
            throw new InvalidPasswordException();
        }

        this.#checkAccount();

    }
    /*
    Validation has been done at this stage for the pair of username and password:
     */
    static async loadAccount(account:Account):Promise<Array<Account>> {

        const dbAccounts = new Array<Account>();

        const hasher:Hashing = getHasher();
        const hashedPassword = await hasher.hashPassword(account.password, account.username);

        let results = await db().query<{
            username:string,
            password:string
        }>(
            `
                SELECT *
                FROM account
                WHERE username = $1
                  AND password = $2
            `,
            [account.username, hashedPassword]
        );
        for (let row of results.rows) {

            let dbAccount = new Account(row.username, row.password);

            dbAccount.#company = await Company.getCompanyForAccount(dbAccount);

            dbAccounts.push(dbAccount)
        }

        if(dbAccounts.length == 0){
            throw new InvalidCredentialsExceptions();
        }

        return dbAccounts;
    }

    static async saveAccount(account: Account, company:Company) {

        try {

            account.#company = company;

            const hasher:Hashing = getHasher();
            const hashedPassword = await hasher.hashPassword(account.password, account.username);

            /*
            Trying to add account to the db, this also checks if it exists and throws exception.
             */
            await db().query<{
                username:string,
                password: string
            }>(`
                INSERT INTO account (username, password)
                VALUES ($1, $2)
                returning username
            `, [account.username, hashedPassword]);

            /*
            Need await statement here as it throws error, and any to catch async error needs to have await.
             */
            // await Company.createCompany(company);

            // await db().exec("COMMIT")

        } catch (e: any) {

            // await db().exec("ROLLBACK");

            if (e.code === '23505') {
                throw new DuplicateUsernameException();
            }
            throw e;
        }
    }
    #checkAccount(){
        assert(this.#username.length >0,"Username Cannot be empty " )
        assert(this.#password.length >0,"Password Cannot be empty " )

    }

    get username(): string{

        return this.#username;
    }
    get password(): string{

        return this.#password;
    }

    get company(): Company{
        return this.#company!;
    }

}

export class InvalidUsernameException extends Error { }
export class DuplicateUsernameException extends Error { }

export class InvalidPasswordException extends Error { }
export class InvalidCredentialsExceptions extends Error { }

