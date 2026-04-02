import Company from "../Model/Company.ts";
import CompanyView from "../View/CompanyView.ts";
import PurchasablesView from "../View/PurchasablesView.ts";
import Upgrades from "../Model/Upgrades.ts";
import Buildings from "../Model/Buildings.ts";
import PurchasableFactory from "../Model/PurchasableFactory.ts";


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
        const upgrade = PurchasableFactory.create(inventory, this.#company);

        if (upgrade instanceof Upgrades) {
            await this.#company.buyUpgrade(upgrade, position);
        }
    }


    async buyBuilding(position:number){

        const inventory = this.#buildings[position];

        const building = PurchasableFactory.create(inventory, this.#company);

        if (building instanceof Buildings) {
            await this.#company.buyBuildings(building,position);
        }
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

    /*
    As per the ddl the indecies from 0-4 are the Buildings and 5-9 are the upgrades
     */

    /*
    this autobuy is a little fishy, as it has some logic, need to check with franklin for this.
    Also, if I give this responsibiity to the company itself, I would need an inventory in there.
     */
    autoBuy(){
        let startingIndexOfUpgrades: number =5;

        if(this.#company.markovEnabled){

            const newPurchase = this.#company.roboBuy();

           if(newPurchase >=startingIndexOfUpgrades){
               this.buyUpgrade(newPurchase-startingIndexOfUpgrades);
           }else{
               this.buyBuilding(newPurchase);
           }
        }
    }
}