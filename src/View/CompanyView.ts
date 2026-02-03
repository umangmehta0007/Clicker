import type Company from "../Model/Company.ts";
// import type CompanyController from "../Controller/CompanyController.ts";

export default class  CompanyView{

    #company: Company;
    #teamEl: HTMLDivElement;


    constructor(company: Company){
        this.#company = company;

        this.#company.registerListener(this);
        // document.querySelector('#app')!.innerHTML =
        //     "<div id = 'company' ><ul></ul> </div>"
        document.querySelector('#app')!.innerHTML =
            "<div id = 'company'> </div>"

        this.#teamEl = document.querySelector("#company");
    }

    notify(){

        this.#teamEl.replaceChildren();

        this.#teamEl.innerHTML = `<strong>${'Total Gifts Delivered: '+this.#company.totalGifts()}</strong>`
    }

}