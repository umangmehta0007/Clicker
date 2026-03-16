import assert from "../assertions.ts";
import type Company from "./Company.ts";
import db from "./connection.ts";

import Santa from "./Santa.ts";
import Amazon from "./Amazon.ts";

export default abstract class Buildings{

    #name: string;
    #cps: number
    #price: number
    company?:Company;

    constructor(name: string, cps: number, price:number){
        this.#name = name;
        this.#cps = cps;
        this.#price = price;
        this.#checkBuildings();
    }

    get name():string{
        return this.#name;
    }
    get cps(): number{
        return this.#cps;
    }
    get price():number{
        return this.#price;
    }

    #checkBuildings(){
        assert(this.#cps>=1, "Number of clicks should always be greater than equal to one");
        assert(this.#price>=1, "Price should always be greater than equal to one");
    }

    static async getBuildingsForCompany(company: Company){

        const dbBuildings: Array<Buildings> = new Array<Buildings>();

        //Step 1 - Run query in my database , through accessing the db using db() from connection where we created link.
        let santa = await db().query(`
        SELECT * FROM santa WHERE company = $1`,[company.name])

        let amazon = await db().query(`
        SELECT * FROM amazon WHERE company = $1`,[company.name])

        //Step 2 - Now we have all rows, run a for loop to create an instance and push it to our arrayList and return that list.
        for(let row of santa.rows){
            // Step - loop for all additions
            const dbSanta:Buildings = new Santa(row.name, row.cps, row.price);
            dbSanta.company = company;
            dbBuildings.push(dbSanta);

        }

        // Step -  loop for all multipliers
        for(let row of amazon.rows){
            const dbAmazon:Buildings = new Amazon(row.name, row.cps, row.price);

            dbAmazon.company = company;

            dbBuildings.push(dbAmazon);
        }


        return dbBuildings;
    }

}

