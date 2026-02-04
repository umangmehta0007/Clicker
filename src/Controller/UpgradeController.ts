import CompanyController from "../Controller/CompanyController.ts";
import UpgradesView from "../View/UpgradesView.ts";
import Employee from "../Model/Employee.ts";
import Van from "../Model/Van.ts";
import Upgrades from "../Model/Upgrades.ts";


export default class UpgradeController{
    #companyController: CompanyController;
    #upgradeView: UpgradesView;

    constructor(companyController: CompanyController){
        this.#companyController = companyController;
        this.#upgradeView = new UpgradesView(this);
    }

    buyEmployee():void{
        const employee: Upgrades= new Employee(5);
        this.#companyController.addUpgrade(employee);
    }
    buyVan():void{
        const van: Upgrades= new Van(10);
        this.#companyController.addUpgrade(van);
    }
}