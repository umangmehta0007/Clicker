import CompanyController from "../Controller/CompanyController.ts";
import {NotEnoughGiftsException} from "../Model/Company.ts";

//import Company from "../Model/Company.ts";

export default class PurchasablesView {

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

        let additionButton = document.createElement('button');
        let vanButton  = document.createElement('button');

        let santaButton = document.createElement('button');
        let amazonButton = document.createElement('button');

        additionButton.id = "Addition";
        vanButton.id = "Multiplier";
        santaButton.id = "Santa";
        amazonButton.id = "Amazon";

        additionButton.textContent = "Addition (5 clicks Per Click)"
        vanButton.textContent = "Multiplier (10 clicks Per Click)"
        santaButton.textContent = "Santa (5 cps)";
        amazonButton.textContent = "Amazon (10 cps)";

        upgradesEl.appendChild(additionButton);
        upgradesEl.appendChild(vanButton);
        upgradesEl.appendChild(santaButton);
        upgradesEl.appendChild(amazonButton);

        /*
        Successfully added the button
         */

        additionButton.addEventListener("click",()=>this.buyAddition());
        vanButton.addEventListener("click",()=>this.buyMultiplier());

        santaButton.addEventListener("click", () => this.buySanta());
        amazonButton.addEventListener("click", () => this.buyAmazon());

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

    async buyAddition() {
        try {

             await this.#companyController.buyAddition();

        } catch (e) {

            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts for Addition!");
            }
        }
    }
    async buyMultiplier() {
        try {
            await this.#companyController.buyMultiplier();
        } catch (e) {
            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts for Multiplier!");
            }
        }
    }
    async buySanta() {
        try {
            await this.#companyController.buySanta();
        } catch (e) {
            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts for Santa!");
            }
        }
    }
    async buyAmazon() {
        try {
            await this.#companyController.buyAmazon();
        } catch (e) {
            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts for Amazon!");
            }
        }
    }
}