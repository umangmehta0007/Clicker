import assert from "../assertions.ts";
import type Company from "./Company.ts";
import db from "./connection.ts";

/**
 * Represents an upgrade that improves gift generation.
 *
 * Upgrades increase how many gifts are earned either by adding extra
 * gifts or multiplying the total. Each upgrade has a cost, a value,
 * and belongs to a Company.
 */
export default abstract class Upgrades{


    id?: number;
    #clicks: number
    #price: number
    #company:Company;

    constructor(clicks: number, price:number, company:Company){
        this.#clicks = clicks;
        this.#price = price;
        this.#company = company;
        this.#checkUpgrades();
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

    static async saveUpgrades(upgrade:Upgrades){

        if(upgrade instanceof Addition){

            const results = await db().query<{
                id:number
            }>(`
                INSERT INTO addition (id, price, clicks, company) Values (default, $1,$2,$3) returning id
            `,[upgrade.#price, upgrade.#clicks, upgrade.#company.name]);

            results.rows.forEach((row) => {
                upgrade.id = row['id']
                console.log(`Upgrade got ID ${upgrade.id}`)
            })
        }
        else{
            const results = await db().query<{
                id:number
            }>(`
                INSERT INTO multiplier (id, price, clicks, company) VALUES
                    (default, $1,$2,$3) returning id
            `,[upgrade.#price, upgrade.#clicks, upgrade.#company.name]);

            results.rows.forEach((row) => {
                upgrade.id = row['id']
                console.log(`Upgrade got ID ${upgrade.id}`)
            })
        }

    }

    static async getUpgradesForCompany(company: Company){

        const dbUpgrades: Array<Upgrades> = new Array<Upgrades>();

        //Step 1 - Run query in my database , through accessing the db using db() from connection where we created link.
        let addition = await db().query<{
            id:number,
            clicks: number,
            price: number
        }>(`
        SELECT * FROM addition WHERE company = $1`,[company.name])

        let multiplier = await db().query<{
            id:number,
            clicks: number,
            price: number
        }>(`
        SELECT * FROM multiplier WHERE company = $1`,[company.name])

        //Step 2 - Now we have all rows, run a for loop to create an instance and push it to our arrayList and return that list.
        for(let row of addition.rows){
            // Step - loop for all additions
            const dbAddition:Upgrades = new Addition(row.clicks, row.price,company);
            dbAddition.id = row.id;
            dbUpgrades.push(dbAddition);

        }

        // Step -  loop for all multipliers
        for(let row of multiplier.rows){
            const dbMultiplier:Upgrades = new Multiplier(row.clicks, row.price, company);

            dbMultiplier.id = row.id;
            dbUpgrades.push(dbMultiplier);
        }


        return dbUpgrades;
    }

    static async getMultiplier() {
        const results = await db().query<{
            id:number,
            price:number,
            productionvalue:number,
            types:string
        }>(`
            SELECT * FROM inventory WHERE types = 'MULTIPLIER'
        `);

        return results.rows[0];
    }

    static async getAddition() {
        const results = await db().query<{
            id: number,
            price:number,
            productionvalue:number,
            types:string
        }>(`
        SELECT * FROM inventory WHERE types = 'ADDITION'
    `);
        return results.rows[0];
    }
}


export class Multiplier extends Upgrades{
}
export class Addition extends Upgrades{

}

