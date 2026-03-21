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
    #hasStarted: boolean;

    constructor(company: Company){
        this.#company = company;
        this.#companyView = new CompanyView(this.#company, this);
        this.#purchasables = new PurchasablesView(this);
        this.#hasStarted = false;
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
    async buyAddition(){

        const additionInventory = await Upgrades.getAddition();

        const addition = UpgradesFactory.create(additionInventory, this.#company);

        await this.#company.buyUpgrade(addition);
    }
    async buyMultiplier(){

        const data = await Upgrades.getMultiplier();

        const multiplier = UpgradesFactory.create(data, this.#company);

        await this.#company.buyUpgrade(multiplier);
    }
    async buySanta(){

        const data = await Buildings.getSanta();

        const santa = BuildingFactory.create(data, this.#company);

        await this.#company.buyBuildings(santa);
    }
    async buyAmazon(){

        const data = await Buildings.getAmazon();

        const amazon = BuildingFactory.create(data, this.#company);

        await this.#company.buyBuildings(amazon);
    }


    /**
     * Starts automatic gift generation for the company.
     *
     * Calls addGifts every second to update total gifts over time.
     */
    addEverySecond() {

        if(!this.#hasStarted) {
            setInterval(async () => {
                await this.#company.addGifts();
            }, 1000);

            this.#hasStarted =true;
        }

    }

}