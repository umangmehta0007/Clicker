import CompanyController from "../Controller/CompanyController.ts";
import {NotEnoughGiftsException} from "../Model/Company.ts";

//import Company from "../Model/Company.ts";

export default class PurchasablesView {

    #companyEL: HTMLDivElement;
    #companyController: CompanyController;
    #upgrades:any;
    #buildings:any;

    constructor(companyController: CompanyController){

        this.#companyEL = document.querySelector("#company")!;
        this.#companyController =  companyController;
        this.#upgrades = this.#companyController.upgrades;
        this.#buildings = this.#companyController.buildings;

        /*
        Creating and Adding button to the Index.html
        */

        const upgradesEl = document.createElement("div");
        upgradesEl.id = "upgrades";
        upgradesEl.innerHTML = "<h3>Upgrades</h3>";

        const buildingsEl = document.createElement("div");
        buildingsEl.id = "buildings";
        buildingsEl.innerHTML = "<h3>Buildings</h3>";

        const container = document.createElement("div");
        container.id = "purchasables";

        container.append(upgradesEl, buildingsEl);
        this.#companyEL.append(container);
        // this.#companyEL.append(upgradesEl, buildingsEl);
        let i = 0;


        for(let row of this.#upgrades){
            let upgrades = document.createElement('button');
            upgrades.id = "Addition "+i;

            let index = i;

            if(row.types == 'ADDITION'){
                upgrades.textContent = "Addition "+row.productionvalue+"(Per Click) Price: "+row.price+" Gifts";
            }else{
                upgrades.textContent = "Multiplication "+row.productionvalue+"(Per Click) Price: "+row.price+" Gifts";
            }

            upgrades.addEventListener("click", () => {
                this.buyUpgrade(index);
            });
            upgradesEl.appendChild(upgrades);

            i++;
        }

        let j = 0;
        for(let row of this.#buildings){

            let index = j;

            let buildingButtons = document.createElement('button');
            buildingButtons.id = "Building "+ j;

            if(row.types == 'SANTA'){
                buildingButtons.textContent = "SANTA "+row.productionvalue+"Cps Price: "+row.price+" Gifts";
            }else{
                buildingButtons.textContent = "AMAZON "+row.productionvalue+"Cps Price: "+row.price+" Gifts";
            }
            buildingButtons.addEventListener("click", () => {
                this.buyBuilding(index);
            });

            buildingsEl.appendChild(buildingButtons);
            j++;
        }
        
    }

    /*
     What should be done if not enough gifts, this was take from chatGPT. Since it was mentioned, don't memorize HTML.
    */
    #showError(message: string) {

        let errorEl = this.#companyEL.querySelector("#error") as HTMLElement;

        if (!errorEl) {
            errorEl = document.createElement("span");
            errorEl.id = "error";
            errorEl.style.color = "red";
            this.#companyEL.prepend(errorEl);
        }

        errorEl.textContent = message;
    }

    async buyUpgrade(position:number) {
        try {
             await this.#companyController.buyUpgrade(position);

        } catch (e) {

            console.log("SOME ERROR");

            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts to Buy Upgrade!");
            }
        }
    }
    async buyBuilding(position:number) {
        try {
            await this.#companyController.buyBuilding(position);

        } catch (e) {

            console.log("SOME ERROR");

            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts to Buy Building!");
            }
        }
    }

}