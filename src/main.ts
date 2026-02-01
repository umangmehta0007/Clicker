// import Company from "../Model/Company.ts"
import CompanyController from "./Controller/CompanyController.ts"


    let companyController: CompanyController = new CompanyController();

    document.querySelector("#Gift-Button")!.addEventListener("click",(): void=>companyController.addGifts())
