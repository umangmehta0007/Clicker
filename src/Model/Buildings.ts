import assert from "../assertions.ts";
import Company from "./Company.ts";
import db from "./connection.ts";

/**
 * Represents a building that generates gifts over time.
 *
 * Buildings produce gifts automatically (CPS - clicks per second).
 * Each building has a cost and a production value, and belongs to a Company.
 */
export default abstract class Buildings{

    id?: number;
    #cps: number
    #price: number
    #company:Company;

    constructor(cps: number, price:number, company:Company){
        this.#cps = cps;
        this.#price = price;
        this.#company = company;
        this.#checkBuildings();
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

    static async saveBuildings(building: Buildings){

        if(building instanceof Santa){

            const results = await db().query<{
                id:number
            }>(`
                INSERT INTO santa (id, price, cps, company) VALUES
                    (default, $1,$2,$3) returning id
            `,[building.#price, building.#cps, building.#company.name]);

            results.rows.forEach((row) => {
                building.id = row['id']
                console.log(`Santa got ID ${building.id}`)
            })
        }
        else{
            const results = await db().query<{
                id:number
            }>(`
                INSERT INTO amazon (id, price, cps, company) VALUES
                    (default, $1,$2,$3) returning id
            `,[building.#price, building.#cps, building.#company.name]);

            results.rows.forEach((row) => {
                building.id = row['id']
                console.log(`Amazon got ID ${building.id}`)
            })
        }
    }

    static async getBuildingsForCompany(company: Company){

        const dbBuildings: Array<Buildings> = new Array<Buildings>();

        //Step 1 - Run query in my database , through accessing the db using db() from connection where we created link.
        let santa = await db().query<{
            id: number,
            price: number,
            cps: number,
            company: string
        }>(`
            SELECT * FROM santa WHERE company = $1
        `, [company.name]);

        let amazon = await db().query<{
            id: number,
            price: number,
            cps: number,
            company: string
        }>(`
            SELECT * FROM amazon WHERE company = $1
        `, [company.name]);

        //Step 2 - Now we have all rows, run a for loop to create an instance and push it to our arrayList and return that list.
        for(let row of santa.rows){
            // Step - loop for all additions

            const dbSanta:Buildings = new Santa(row.cps, row.price, company);
            dbSanta.id = row.id;
            dbBuildings.push(dbSanta);
        }

        // Step -  loop for all multipliers
        for(let row of amazon.rows){
            // @ts-ignore
            const dbAmazon:Buildings = new Amazon(row.cps, row.price,company);

            dbBuildings.push(dbAmazon);
        }


        return dbBuildings;
    }

    /**
     * Gets the Santa building data from the inventory.
     *
     * Loads the price and production value for Santa from the database.
     *
     * @return the instance of Santa .
     */
    static async getSanta() {
        const results = await db().query<{
            productionvalue:number,
            price:number,
            types:string
        }>(`
        SELECT * FROM inventory WHERE types = 'SANTA'
    `);

        return results.rows[0];
    }


    /**
    * Gets the Amazon building data from the inventory.
    *
    * Loads the price and production value for Amazon from the database.
    *
    * @return the instance of Amazon .
    */
    static async getAmazon() {
        const results = await db().query<{
            productionvalue:number,
            price:number,
            types:string
        }>(`
        SELECT * FROM inventory WHERE types = 'AMAZON'
    `);

        return results.rows[0];
    }

}
export class Santa extends Buildings{
}
export class Amazon extends Buildings{
}

