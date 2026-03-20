import db from "./connection.ts";


export default class Inventory{

    static #items = new Map<string, { price: number, productionvalue: number }>();

    static async loadInventory(){
        let results = await db().query<{
            price: number,
            productionvalue: number,
            types: string
        }>(`SELECT *
            FROM inventory
            `)

        for (let row of results.rows) {
            this.#items.set(row.types, {
                price: row.price,
                productionvalue: row.productionvalue
            });
        }
    }

    static get(type: string) {
        const item = this.#items.get(type);

        return item;
    }


}