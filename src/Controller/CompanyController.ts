import Company from "../Model/Company.ts";
import CompanyView from "../View/CompanyView.ts";


export default class CompanyController{

    #company: Company;
    #companyView: CompanyView

    constructor(){
        this.#company = new Company();
        this.#companyView = new CompanyView(this.#company);
    }


    addGifts(){
        this.#company.addGifts();
    }
}