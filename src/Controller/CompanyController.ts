import Company from "../Model/Company.ts";
import CompanyView from "../View/CompanyView.ts";
import PurchasablesView from "../View/PurchasablesView.ts";

export default class CompanyController{

    #company: Company;
    #companyView: CompanyView
    #purchasables: PurchasablesView

    constructor(company: Company){

        this.#company = company;


        this.#companyView = new CompanyView(this.#company, this);

        this.#company.loadInventory().then(()=>{

            this.#purchasables = new PurchasablesView(this,this.#company.inventory);
        })
    }


    addClick():void{
        this.#company.addClick();
    }


    async buyItem(position:number){

        console.log(position);
         await this.#company.buyItem(position);
    }

    /**
     * Enables or disables the auto-buy (Markov) feature.
     *
     * @param isOn true to enable auto-buy, false to disable it.
     * @return true if auto-buy can be enabled (i.e., at least one purchase has been made),
     *         false otherwise.
     *
     * Side effects:
     * - Updates the markovEnabled state in the Company.
     */

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

}