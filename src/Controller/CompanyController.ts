import Company from "../Model/Company.ts";
import Upgrades from "../Model/Upgrades.ts";
import CompanyView from "../View/CompanyView.ts";
import UpgradesView from "../View/UpgradesView.ts";

import Multiplier from "../Model/Multiplier.ts";
import Addition from "../Model/Addition.ts";

export default class CompanyController{

    #additionBy: number;
    #multiplicationBy: number;
    #company: Company;
    #companyView: CompanyView
    #upgradeView: UpgradesView

    constructor(){
        this.#company = new Company();
        this.#companyView = new CompanyView(this.#company, this);
        this.#upgradeView = new UpgradesView(this);
        this.#additionBy = 5;
        this.#multiplicationBy = 10;
    }

    addGifts():void{
        this.#company.addGifts();
    }
    buyEmployee():void{
        const employee: Upgrades= new Addition(this.#additionBy);
        this.#company.buyUpgrade(employee);
    }
    buyVan():void{
        const van: Upgrades= new Multiplier(this.#multiplicationBy);
        this.#company.buyUpgrade(van);
    }
}