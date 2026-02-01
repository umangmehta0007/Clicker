import type Company from "../Model/Company.ts";

export default class  CompanyView{

    #company: Company;
    #teamEl: HTMLUListElement;


    constructor(company: Company){
        this.#company = company;

        this.#company.registerListener(this);

        document.querySelector('#app')!.innerHTML =
            "<div id = 'company' ><ul></ul> </div>"

        this.#teamEl = document.querySelector("#company> ul");
    }

    notify(){

        console.log(this.#company.totalGifts());
    }

}