import Inventory from "./Inventory.ts";
import Company from "./Company.ts";
import Upgrades, { Addition, Multiplier } from "./Upgrades.ts";

export default class UpgradeFactory {

    static create(type: string, company: Company): Upgrades {

        const data = Inventory.get(type);

        if (type === "ADDITION") {
            return new Addition(
                data!.productionvalue,
                data!.price,
                company
            );
        }else {
            return new Multiplier(
                data!.productionvalue,
                data!.price,
                company
            );
        }

    }
}