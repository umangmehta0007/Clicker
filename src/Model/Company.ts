
import Upgrades from "./Upgrades.ts"
import type Listener from "./Listener.ts"
import assert from "../assertions.ts";
import Buildings from "./Upgrades.ts";
import Addition from "./Addition.ts";
import Multiplier from "./Multiplier.ts";
import Account from "./Account.ts";
import db from "./connection.ts";

export default class Company{

    #name: string;
    #upgrades: Array<Upgrades>;
    #buildings: Array<Buildings>;
    #totalGifts: number;
    #listeners: Array<Listener>;
    #account?: Account;


    constructor(name: string){
        this.#name = name;
        this.#upgrades = [];
        this.#buildings = [];

        this.#totalGifts = 0;
        this.#listeners = new Array<Listener>();
        this.#checkCompany();
    }

    #checkCompany(){
        assert(this.#totalGifts>=0, "Gifts should always be greater than equal to zero");
        assert(this.#name.length >0, "Name should not be empty");
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
    buyUpgrade(u:Upgrades){
        this.#upgrades.push(u);

        /*
        This notifyAll here is just additonal part: I know it voilates mvp but this is just for visual purposes
        */
        this.#notifyAll();
    }

    buyBuildings(b:Buildings){
        this.#upgrades.push(b);
        /*
        This notifyAll here is just additonal part: I know it voilates mvp but this is just for visual purposes
        */
        this.#notifyAll();
    }



    static async getCompanyForAccount(account: Account):Promise<Company>{

        const results = await db().query(
            `SELECT * FROM company WHERE account = $1`,
                    [account.username]);

        let dbCompany = new Company(results.rows[0].name);

        dbCompany.#totalGifts = results.rows[0].totalGifts;


        dbCompany.#upgrades = await Upgrades.getUpgradesForCompany(dbCompany);
        dbCompany.#buildings = await Buildings.getBuildingsForCompany(dbCompany);

        return dbCompany;
    }

    /*
    This method return an array of total clicks from Addition and Multiplication:
     */

    clicksFromAddition():number{

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

    clicksFromMultiplication():number{

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


    /*
    Adding listeners to this Company
     */
    #notifyAll(){
        this.#listeners
            .forEach((l) => l.notify());
    }

    registerListener(listener: Listener){

        this.#listeners.push(listener);
    }

}

export class InvalidNameException extends Error{}