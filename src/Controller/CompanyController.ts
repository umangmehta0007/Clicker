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

        await this.#company.buyUpgrade(upgrade,position);
    }


    async buyBuilding(position:number){

        const inventory = this.#buildings[position];

        const building = BuildingFactory.create(inventory, this.#company);

        await this.#company.buyBuildings(building,position);
    }

    toggleAutoBuy(isOn:boolean){

        let success:boolean = (this.#company.lastPurchase >= 0);
        if(isOn){
            if(success){
                this.#company.markovEnabled = true;
            }
        }else{
            this.#company.markovEnabled = false;
        }

        return success;
    }

    enableMarkov(){

    }

    /*
    As per the ddl the indecies from 0-4 are the Buildings and 5-9 are the upgrades
     */
    autoBuy(){
        let startingIndexOfUpgrades: number =5;
        console.log("check1");

        if(this.#company.markovEnabled){
            console.log("check2");

            const newPurchase = this.#company.roboBuy();

           console.log(newPurchase);
           if(newPurchase >=startingIndexOfUpgrades){
               this.buyUpgrade(newPurchase-startingIndexOfUpgrades);
           }else{
               this.buyBuilding(newPurchase);
           }
        }
    }
}