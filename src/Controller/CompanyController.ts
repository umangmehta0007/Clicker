import Company from "../Model/Company.ts";
import Upgrades from "../Model/Upgrades.ts";
import CompanyView from "../View/CompanyView.ts";
import UpgradesView from "../View/UpgradesView.ts";

import Van from "../Model/Van.ts";
import Employee from "../Model/Employee.ts";

export default class CompanyController{

    #company: Company;
    #companyView: CompanyView
    #upgradeView: UpgradesView

    constructor(){
        this.#company = new Company();
        this.#companyView = new CompanyView(this.#company, this);
        this.#upgradeView = new UpgradesView(this);
    }

    addGifts():void{
        this.#company.addGifts();
    }
    buyEmployee():void{
        const employee: Upgrades= new Employee(5);
        this.#company.buyUpgrade(employee);
    }
    buyVan():void{
        const van: Upgrades= new Van(10);
        this.#company.buyUpgrade(van);
    }
}