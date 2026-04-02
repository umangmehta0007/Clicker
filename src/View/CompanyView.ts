import type Company from "../Model/Company.ts";
import type CompanyController from "../Controller/CompanyController.ts";

export default class  CompanyView{

    #company: Company;
    #teamEl: HTMLUListElement;
    #companyController: CompanyController;
    #hasStarted: boolean;



    /*
    This internalState just additional part: I know it violates mvp but this is just for visual purposes
     */
    #internalState!: HTMLDivElement

    constructor(company: Company,companyController: CompanyController){

        this.#company = company;

        this.#companyController = companyController;
        this.#hasStarted = false;
        this.#company.registerListener(this);
        document.querySelector('#app')!.innerHTML =
            "<div id='company'>" +
            "<button id='Gift-Button'> Deliver Happiness </button>" +
            "<label>" +
            "<input type='checkbox' id='auto-buy-toggle' /> Auto Buy" +
            "</label>" +
            "<ul></ul>" +
            "</div>";

        this.#teamEl = document.querySelector('#company>ul')!;
        this.#internalState = document.createElement("div");

        const toggle = document.querySelector('#auto-buy-toggle') as HTMLInputElement;

        toggle.addEventListener("change", () => {
            const success = this.#companyController.toggleAutoBuy(toggle.checked);

            /*
            Other technique i could have done was to call a method in controller,
            That would change company's state , and if there are no purchases it woudl throw an exception
            and it would be caught here and change toggle state
             */
            if (!success) {
                toggle.checked = false;
                alert("You must make at least one purchase first.");
            }
        });

        /*
        Ask professor if this autoBuying should be initilized in here or inside the model itself
        Or should I check here if toggle.checked
         */
        document.querySelector("#Gift-Button")!.addEventListener("click",(): void=>{
            this.#companyController.addClick();
        })


        /*
        Toggle Taken from chatGPT
         */


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

        document.querySelector("#purchasables")!.append(this.#internalState);
    }

}