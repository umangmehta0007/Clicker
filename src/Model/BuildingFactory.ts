import Company from "./Company.ts";
import Buildings, { Santa, Amazon } from "./Buildings.ts";

/**
 * Factory class used to create building objects.
 *
 * This class takes building data from the database and creates the
 * correct building type (Santa, Amazon) for a Company.
 */
export default class BuildingFactory {

    static create(data:any, company: Company): Buildings {

        let building: Buildings;

        if (data.types === "SANTA") {
            building = new Santa(
                data.productionvalue,
                data.price,
                company
            );
        } else {
            building = new Amazon(
                data.productionvalue,
                data.price,
                company
            );
        }

        return building;
    }
}