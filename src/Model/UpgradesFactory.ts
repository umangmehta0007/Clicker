
import type Company from "./Company.ts";
import {Addition, Multiplier} from "./Upgrades.ts";

export default class UpgradesFactory {

    static create(data:any, company: Company) {

        let upgrade;

        if (data.types === "ADDITION") {
            upgrade = new Addition(
                data.productionvalue,
                data.price,
                company
            );
        } else{
            upgrade = new Multiplier(
                data.productionvalue,
                data.price,
                company
            );
        }
        return upgrade;
    }
}