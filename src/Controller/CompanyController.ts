import Company from "../Model/Company.ts";
import CompanyView from "../View/CompanyView.ts";
import PurchasablesView from "../View/PurchasablesView.ts";
import UpgradeFactory from "../Model/UpgradesFactory.ts";
import BuildingFactory from "../Model/BuildingFactory.ts";


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

    async buyAddition(){


        const addition =  UpgradeFactory.create('ADDITION', this.#company);

        await this.#company.buyUpgrade(addition);
    }
    async buyMultiplier(){

        const multiplier =  UpgradeFactory.create('MULTIPLIER', this.#company);

        await this.#company.buyUpgrade(multiplier);
    }
    async buySanta(){

        const santa =  BuildingFactory.create('SANTA', this.#company);

        await this.#company.buyBuildings(santa);
    }
    async buyAmazon(){

        const amazon =  BuildingFactory.create('AMAZON', this.#company);

        await this.#company.buyBuildings(amazon);
    }


    addEverySecond() {

        if(!this.#hasStarted) {
            setInterval(async () => {
                await this.#company.addGifts();
            }, 1000);

            this.#hasStarted =true;
        }

    }

}