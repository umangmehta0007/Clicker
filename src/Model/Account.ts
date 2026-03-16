import Company from "./Company.ts";
import assert from "../assertions.ts";
import db from "./connection.ts";

export default class Account{
    #username:string
    #password:string
    #company!: Company;

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

        let results = await db().query(
            `
                SELECT *
                FROM account
                WHERE username = $1
                  AND password = $2
            `,
            [account.username, account.password]
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

    static async saveAccount(account:Account){
        console.log(`INSERT INTO account (username, password) VALUES ('${account.username}', '${account.password}')returning name`);

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
        return this.#company;
    }

}

export class InvalidUsernameException extends Error { }
export class InvalidPasswordException extends Error { }
export class InvalidCredentialsExceptions extends Error { }

