//Given will be the controls to check DB and create instances of new Account - Calling Company controller to create instances of company

import HomePageView from "../View/HomePageView.ts";
// import CompanyController from "./CompanyController.ts";
import {CreateNewAccountView} from "../View/CreateNewAccountView.ts";
import Account from "../Model/Account.ts";
import {SigninAccountView} from "../View/SigninAccountView.ts";
import CompanyController from "./CompanyController.ts";


export default class HomePageController{

    #homePageView: HomePageView;
    #signInAccount?: SigninAccountView;
    #newAccount?: CreateNewAccountView;

    constructor(){
        this.#homePageView = new HomePageView(this);
    }


    signIn():void{

        if(this.#signInAccount === undefined){
            this.#signInAccount= new SigninAccountView(this);
        }


        //here the controller of the company will be initialized.

    }

    signUp():void{


        if(this.#newAccount === undefined) {
            this.#newAccount = new CreateNewAccountView(this);
        }
    }

    async signInUser(username: string, password: string){

        const account  = new Account(username, password);

        const dbAccounts = await Account.loadAccount(account);

        const dbAccount = dbAccounts[0];

        new CompanyController(dbAccount.company);

        this.#signInAccount= undefined;
    }



    createAccount(username, passoword, companyName){
        this.#newAccount = undefined;
    }




}
