import type Company from "../Model/Company.ts";
import type CompanyController from "../Controller/CompanyController.ts";

export default class  CompanyView{

    #company: Company;
    #teamEl: HTMLUListElement;
    #companyController: CompanyController;
    #hasStarted: boolean;

    /*
    This internalState just additonal part: I know it voilates mvp but this is just for visual purposes
     */
    #internalState!: HTMLDivElement

    constructor(company: Company,companyController: CompanyController ){

        this.#company = company;
        this.#companyController = companyController;
        this.#hasStarted = false;
        this.#company.registerListener(this);
        document.querySelector('#app')!.innerHTML =
            "<div id = 'company' >" +
            "<button id = 'Gift-Button'> Deliver Happiness </button> " +
            "<ul></ul> " +
            "</div>"

        this.#teamEl = document.querySelector('#company>ul')!;
        this.#internalState = document.createElement("div");

        document.querySelector("#Gift-Button")!.addEventListener("click",(): void=>this.#companyController.addClick())
        this.addEverySecond();
    }

    addEverySecond() {
        if(!this.#hasStarted) {
            setInterval(async () => {
                await this.#company.addGifts();
            }, 1000);

            this.#hasStarted =true;
        }
    }

    notify(){
        this.#teamEl.replaceChildren();

        this.#teamEl.innerHTML = `<strong>${'Total Gifts Delivered: '+this.#company.totalGifts}</strong>`
        this.#internalState.id = "sum";
        this.#internalState.innerHTML = `
        <strong>Total Upgrades: ${this.#company.upgrades.length}</strong><br>
        <strong>Total Buildings: ${this.#company.buildings.length}</strong>
        `;

        document.querySelector("#upgrades")!.append(this.#internalState);
    }

}