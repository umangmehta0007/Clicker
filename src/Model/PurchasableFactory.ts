import Company from "./Company.ts";
import Buildings, { Santa, Amazon } from "./Buildings.ts";
import Upgrades, { Addition, Multiplier } from "./Upgrades.ts";

export default class PurchasableFactory{

    static create(data: any, company: Company): Buildings | Upgrades {

        switch (data.types) {

            // Upgrades
            case "ADDITION":
                return new Addition(
                    data.productionvalue,
                    data.price,
                    company
                );

            case "MULTIPLIER":
                return new Multiplier(
                    data.productionvalue,
                    data.price,
                    company
                );

            // Buildings
            case "SANTA":
                return new Santa(
                    data.productionvalue,
                    data.price,
                    company
                );

            case "AMAZON":
                return new Amazon(
                    data.productionvalue,
                    data.price,
                    company
                );

            default:
                throw new Error("Unknown type");
        }
    }
}