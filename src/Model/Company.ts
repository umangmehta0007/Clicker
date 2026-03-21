
import Upgrades, {Addition, Multiplier} from "./Upgrades.ts"
import type Listener from "./Listener.ts"
import assert from "../assertions.ts";
import Buildings from "./Buildings.ts";
import Account from "./Account.ts";
import db from "./connection.ts";

/**
 * Represents a company in the game.
 *
 * A Company stores the total gifts and manages all upgrades and buildings.
 * It handles buying items, generating gifts (manual by clicking and automatic per second), and
 * saving/loading its state from the database.
 */
export default class Company{

    #name: string;
    #upgrades: Array<Upgrades>;
    #buildings: Array<Buildings>;
    #totalGifts: number;
    #listeners: Array<Listener>;
    #account: Account;

    constructor(name: string,account:Account ){
        this.#name = name;
        this.#account = account;
        this.#upgrades = [];
        this.#buildings = [];

        this.#totalGifts = 0;
        this.#listeners = new Array<Listener>();

        if(this.#name.length <1){
            throw new InvalidNameException();
        }
        this.#checkCompany();
    }

    #checkCompany(){
        assert(this.#totalGifts>=0, "Gifts should always be greater than equal to zero");
        assert(this.#name.length >0, "Name should not be empty");
    }


    registerListener(listener: Listener){

        this.#listeners.push(listener);
    }
    #notifyAll(){
        this.#listeners
            .forEach((l) => l.notify());
    }


    /**
     * Saves the current company data to the database.
     *
     * Stores total gifts, upgrades, and buildings.
     */
    async #saveCompany(): Promise<Company> {

        await db().query(`
        UPDATE company
        SET totalgifts = $1
        WHERE account = $2
    `, [this.#totalGifts, this.#account.username]);

        for (let x of this.#upgrades) {
            if (!x.id) {
                await Upgrades.saveUpgrades(x);
            }
        }

        for (let x of this.#buildings) {
            if (!x.id) {
                await Buildings.saveBuildings(x);
            }
        }

        return this;
    }

    /**
     * Creates a new company in the database.
     *
     * Used when a new account is created.
     */
    static async createCompany(company:Company){
    //could have used upsert, but wasn't aware of it until the class on 19th March , lol!
        try{
            await db().query<{
                name:string,
                totalGifts: number,
                account:string,
            }>(`
        INSERT into company(name, totalgifts, account)
                    VALUES($1,$2,$3) returning name`,
                [company.#name,company.#totalGifts, company.#account.username ]);

            console.log(company.#totalGifts);

            return company;

        }catch(e:any){
            if(e.code === '23505'){
                throw new CompanyAlreadyExistsError();
            }
            throw e;
        }
    }

    /*
    /added a getter to get total gifts rn, per click.
     */
    get totalGifts(): number{
        return this.#totalGifts;
    }
    get name(): string{
        return this.#name;
    }

    get buildings(): Array<Buildings>{
        return this.#buildings;
    }
    get upgrades(): Array<Upgrades>{
        return this.#upgrades;
    }


    /*
   This method is for the listener when a button is clicked.
    */


    async buyUpgrade(u:Upgrades){

        console.log("Gifts:", this.#totalGifts, "Price:", u.price);

        if (this.#totalGifts < u.price) {
            throw new NotEnoughGiftsException();
        }

        this.#totalGifts -= u.price;

        this.#upgrades.push(u);


        await this.#saveCompany();
        this.#notifyAll();

        /*
        This notifyAll here is just additonal part: I know it voilates mvp but this is just for visual purposes
        */
    }

    async buyBuildings(b:Buildings){

        if (this.#totalGifts < b.price) {
            throw new NotEnoughGiftsException();
        }

        this.#totalGifts -= b.price;
        this.#buildings.push(b);
        await this.#saveCompany();
        /*
        This notifyAll here is just additional part: I know it violates mvp but this is just for visual purposes
        */
        this.#notifyAll();
    }


    /**
     * Loads the company for a given account.
     *
     * @param account the account whose company we want
     * @return the company linked to the account
     */
    static async getCompanyForAccount(account: Account):Promise<Company>{

        const results = await db().query<{
            name:string;
            totalgifts:number;
            account:string
        }>(
            `SELECT * FROM company WHERE account = $1`,
                    [account.username]);


        let dbCompany = new Company(results.rows[0].name, account);

        dbCompany.#totalGifts = results.rows[0].totalgifts;


       dbCompany.#upgrades = await Upgrades.getUpgradesForCompany(dbCompany);
        dbCompany.#buildings = await Buildings.getBuildingsForCompany(dbCompany);

        return dbCompany;
    }

    /*
    This method return an array of total clicks from Addition and Multiplication:
     */


    #clicksFromAddition():number{

        const totalClicks:number = this.#upgrades.reduce(
            (acc:number,curr:Upgrades)=> {
                if (curr instanceof Addition) {
                    return acc + curr.clicks;
                }
                return acc;
            },
            0
        )

        return totalClicks;
    }

    #clicksFromMultiplication():number{

        const totalClicks:number = this.#upgrades.reduce(
            (acc:number,curr:Upgrades)=> {
                if (curr instanceof Multiplier) {
                    return acc + curr.clicks;
                }
                return acc;
            },
            0
        )

        return totalClicks;
    }

    #cpsFromBuildings(): number {

        const cps =  this.#buildings.reduce(
            (acc: number, curr: Buildings) => acc + curr.cps,
            0
        );

        return cps;
    }

    /**
     * Adds one gift when user clicks.Also gets modified based on upgrades you have.
     */
    async addClick() {

        const addition = this.#clicksFromAddition();
        const multiplier = this.#clicksFromMultiplication();

        let total = 1 + addition;
        total = total * (1 + multiplier);

        this.#totalGifts += total;

        await this.#saveCompany();
        this.#notifyAll();
    }

    /**
     * Adds gifts automatically based on buildings and upgrades.
     */
    async addGifts() {

        const buildingCps = this.#cpsFromBuildings();

        const addition = this.#clicksFromAddition();
        const multiplier = this.#clicksFromMultiplication();

        let total = 0;

        if (buildingCps > 0) {
            total = buildingCps + addition;
            total = total * (1 + multiplier);
        }

        this.#totalGifts += total;

        await this.#saveCompany();
        this.#notifyAll();
    }

}

export class InvalidNameException extends Error{}
export class CompanyAlreadyExistsError extends Error{}
export class NotEnoughGiftsException extends Error{}