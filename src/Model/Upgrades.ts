import assert from "../assertions.ts";
import type Company from "./Company.ts";
import db from "./connection.ts";
import Addition from "./Addition.ts";
import Multiplier from "./Multiplier.ts";

export default abstract class Upgrades{

    #name: string;
    #clicks: number
    #price: number
    company?:Company;

    constructor(name: string, clicks: number, price:number){
        this.#name = name;
        this.#clicks = clicks;
        this.#price = price;
        this.#checkUpgrades();
    }

    get name():string{
        return this.#name;
    }
    get clicks(): number{
        return this.#clicks;
    }
    get price():number{
        return this.#price;
    }

    #checkUpgrades(){
        assert(this.#clicks>=1, "Number of clicks should always be greater than equal to one");
        assert(this.#price>=1, "Price should always be greater than equal to one");
    }


    static async getUpgradesForCompany(company: Company){

        const dbUpgrades: Array<Upgrades> = new Array<Upgrades>();

        //Step 1 - Run query in my database , through accessing the db using db() from connection where we created link.
        let addition = await db().query(`
        SELECT * FROM addition WHERE company = $1`,[company.name])

        let multiplier = await db().query(`
        SELECT * FROM multiplier WHERE company = $1`,[company.name])

        //Step 2 - Now we have all rows, run a for loop to create an instance and push it to our arrayList and return that list.
        for(let row of addition.rows){
            // Step - loop for all additions
            const dbAddition:Upgrades = new Addition(row.name, row.clicks, row.price);
            dbAddition.company = company;
            dbUpgrades.push(dbAddition);

        }

        // Step -  loop for all multipliers
        for(let row of multiplier.rows){
            const dbMultiplier:Upgrades = new Multiplier(row.name, row.clicks, row.price);

            dbMultiplier.company = company;

            dbUpgrades.push(dbMultiplier);
        }


        return dbUpgrades;
    }

}

