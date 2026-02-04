// import Company from "../Model/Company.ts"
import CompanyController from "./Controller/CompanyController.ts"
import UpgradeController from "./Controller/UpgradeController.ts"



/*
1) Now the aim would be to move this gift button being clicked listener to the view as

    * View is responsible for getting input(UI)
    * Then View will ask controller to do thing and so on..

2) So the issue would be now, that our view should know about the controller, so it wil have a new instance of controller
3) Now , since view is created inside the controller it will be passed an instance of itself.

 */

    let companyController: CompanyController = new CompanyController();
    let upgradeController: UpgradeController = new UpgradeController(companyController);
