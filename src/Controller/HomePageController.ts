//Given will be the controls to check DB and create instances of new Account - Calling Company controller to create instances of company

import HomePageView from "../View/HomePageView.ts";
import {CreateNewAccountView} from "../View/CreateNewAccountView.ts";
import Account from "../Model/Account.ts";
import {SigninAccountView} from "../View/SigninAccountView.ts";
import CompanyController from "./CompanyController.ts";
import Company from "../Model/Company.ts";

export default class HomePageController{

    #homePageView: HomePageView;
    #signInAccount?: SigninAccountView;
    #newAccount?: CreateNewAccountView;
    #companyController?: CompanyController;

    constructor(){
        this.#homePageView = new HomePageView(this);
    }


    signIn():void{


        if(this.#signInAccount === undefined){
            this.#signInAccount= new SigninAccountView(this);
        }
        else {
            this.#signInAccount.open();
        }
        //here the controller of the company will be initialized.

    }

    signUp():void{

        if(this.#newAccount === undefined) {
            this.#newAccount = new CreateNewAccountView(this);
        }else{
            this.#newAccount.open();
        }
    }

    async signInUser(username: string, password: string){


        const account  = new Account(username, password);

        const dbAccounts = await Account.loadAccount(account);

        const dbAccount = dbAccounts[0];

        this.#signInAccount= undefined;

        this.#companyController = new CompanyController(dbAccount.company);
        this.#companyController.addEverySecond();
    }

    async createAccount(username:string, password:string, companyName:string){

        /*
        I was thinking to do hashing here, but then issue was DBC, was failing
        Then I re-read MVC and figured that controller only calls stuff to happen
        So it just know what's happening but what really happens/logic is in model.
         */
        const account:Account = new Account(username, password);
        const company:Company = new Company(companyName,account);

        await Account.saveAccount(account, company);

        this.#newAccount = undefined;
    }

    /*
    Need only derived bits, not the derived key as we were just storing data in the db, and need not any encrption.
     */
}
