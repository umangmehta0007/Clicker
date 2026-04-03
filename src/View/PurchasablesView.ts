import CompanyController from "../Controller/CompanyController.ts";
import  {NotEnoughGiftsException} from "../Model/Company.ts";

//import Company from "../Model/Company.ts";

export default class PurchasablesView {

    #companyEL: HTMLDivElement;
    #companyController: CompanyController;
    #purchasables:any;
    constructor(companyController: CompanyController,inventory:any){

        this.#companyEL = document.querySelector("#company")!;
        this.#companyController =  companyController;
        /*
        Generate a setter for purchasables that you load.
         */
        this.#purchasables = inventory;

        const container = document.createElement("div");
        container.id = "purchasables";
        container.innerHTML = "<h3>Purchasables</h3>";

        this.#companyEL.append(container);

        let i = 0;

        console.log(this.#purchasables.length);

        for (let row of this.#purchasables) {

            let button = document.createElement('button');
            let index = i;

            // text rendering
            if (row.types === 'ADDITION') {
                button.textContent = `Addition ${row.productionvalue} (Per Click) Price: ${row.price} Gifts`;
            }
            else if (row.types === 'MULTIPLIER') {
                button.textContent = `Multiplication ${row.productionvalue} (Per Click) Price: ${row.price} Gifts`;
            }
            else if (row.types === 'SANTA') {
                button.textContent = `SANTA ${row.productionvalue} CPS Price: ${row.price} Gifts`;
            }
            else if (row.types === 'AMAZON') {
                button.textContent = `AMAZON ${row.productionvalue} CPS Price: ${row.price} Gifts`;
            }

            button.addEventListener("click", () => {
                this.buyItem(index); // unified method
            });

            container.appendChild(button);
            i++;
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

    async buyItem(position: number) {
        try {
            await this.#companyController.buyItem(position);

        } catch (e) {

            console.log("SOME ERROR");

            if (e instanceof NotEnoughGiftsException) {
                this.#showError("Not enough gifts to buy item!");
            }
        }
    }

}