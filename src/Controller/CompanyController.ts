import Company from "../Model/Company.ts";
import CompanyView from "../View/CompanyView.ts";
import PurchasablesView from "../View/PurchasablesView.ts";
import BuildingFactory from "../Model/BuildingFactory.ts";
import Upgrades from "../Model/Upgrades.ts";
import UpgradesFactory from "../Model/UpgradesFactory.ts";
import Buildings from "../Model/Buildings.ts";


export default class CompanyController{

    #company: Company;
    #companyView: CompanyView
    #purchasables: PurchasablesView
    #upgrades:any;
    #buildings:any;

    constructor(company: Company){

        this.#company = company;

        Upgrades.getUpgrades().then(upgrades => {
            this.#upgrades = upgrades;

            Buildings.getBuildings().then(buildings => {
                this.#buildings = buildings;
                this.#companyView = new CompanyView(this.#company, this);
                this.#purchasables = new PurchasablesView(this);
            });
        });
    }

    get upgrades():any{
        return this.#upgrades;
    }
    get buildings():any{
        return this.#buildings;
    }

    addClick():void{
        this.#company.addClick();
    }

    /** Below 4 mehtods work in same way:
     *
     * Buys an item (upgrade or building) for the company.
     *
     * Loads item data from the database, creates the correct object using
     * a factory, and then adds it to the company after deducting gifts.
     */
    async buyUpgrade(position:number){

        console.log(position);
        const inventory = this.#upgrades[position];
        const upgrade = UpgradesFactory.create(inventory, this.#company);

        await this.#company.buyUpgrade(upgrade);
    }


    async buyBuilding(position:number){

        const inventory = this.#buildings[position];

        const building = BuildingFactory.create(inventory, this.#company);

        await this.#company.buyBuildings(building);
    }



    /**
     * Starts automatic gift generation for the company.
     *
     * Calls addGifts every second to update total gifts over time.
     */

}