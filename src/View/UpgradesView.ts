import UpgradeController from "../Controller/UpgradeController.ts";

//import Company from "../Model/Company.ts";

export default class UpgradesView{

    #companyEL: HTMLDivElement;
    #upgradeController: UpgradeController;

    constructor(upgradeController: UpgradeController){

        this.#companyEL = document.querySelector("#company")!;
        this.#upgradeController =  upgradeController;
        /*
        Creating and Adding button to the Index.html
         */
        const upgradesEl = document.createElement("div");
        upgradesEl.id = "upgrades";
        this.#companyEL.append(upgradesEl);

        let employeebutton = document.createElement('button');
        let vanButton  = document.createElement('button');

        employeebutton.id = "Employee";
        vanButton.id = "Van";

        employeebutton.textContent = "Employee (5 clicks Per Click)"
        vanButton.textContent = "Van (10 clicks Per Click)"

        upgradesEl.appendChild(employeebutton);
        upgradesEl.appendChild(vanButton);

        /*
        Successfully added the button
         */

        employeebutton.addEventListener("click",()=>upgradeController.buyEmployee());
        vanButton.addEventListener("click",()=>upgradeController.buyVan());

    }

}