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