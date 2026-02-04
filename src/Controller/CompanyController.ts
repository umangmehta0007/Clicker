import Company from "../Model/Company.ts";
import Upgrades from "../Model/Upgrades.ts";
import CompanyView from "../View/CompanyView.ts";
//import UpgradesView from "../View/UpgradesView.ts";

export default class CompanyController{

    #company: Company;
    #companyView: CompanyView

    constructor(){
        this.#company = new Company();
        this.#companyView = new CompanyView(this.#company, this);
    }


    addGifts():void{
        this.#company.addGifts();
    }
    addUpgrade(upgrade: Upgrades): void{
        this.#company.buyUpgrade(upgrade);
    }
}