import CompanyController from "../Controller/CompanyController.ts";

//import Company from "../Model/Company.ts";

export default class UpgradesView{

    #companyEL: HTMLDivElement;
    #companyController: CompanyController;

    constructor(companyController: CompanyController){

        this.#companyEL = document.querySelector("#company")!;
        this.#companyController =  companyController;
        
        /*
        Creating and Adding button to the Index.html
        */

        const upgradesEl = document.createElement("div");
        upgradesEl.id = "upgrades";
        this.#companyEL.append(upgradesEl);

        let employeeButton = document.createElement('button');
        let vanButton  = document.createElement('button');

        employeeButton.id = "Employee";
        vanButton.id = "Van";

        employeeButton.textContent = "Employee (5 clicks Per Click)"
        vanButton.textContent = "Van (10 clicks Per Click)"

        upgradesEl.appendChild(employeeButton);
        upgradesEl.appendChild(vanButton);

        /*
        Successfully added the button
         */

        employeeButton.addEventListener("click",()=>this.#companyController.buyEmployee());
        vanButton.addEventListener("click",()=>this.#companyController.buyVan());

    }

}