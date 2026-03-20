
import Inventory from "./Inventory.ts";
import Company from "./Company.ts";
import Buildings, { Santa, Amazon } from "./Buildings.ts";

export default class BuildingFactory {

    static create(type: string, company: Company): Buildings {

        const data= Inventory.get(type);

        if (type === "SANTA") {
            return new Santa(
                data!.price,
                data!.productionvalue,
                company
            );
        }else{
            return new Amazon(
                data!.price,
                data!.productionvalue,
                company
            );
        }

    }
}