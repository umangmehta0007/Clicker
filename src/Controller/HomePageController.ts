//Given will be the controls to check DB and create instances of new Account - Calling Company controller to create instances of company

import HomePageView from "../View/HomePageView.ts";
import {CreateNewAccountView} from "../View/CreateNewAccountView.ts";
import Account from "../Model/Account.ts";
import {SigninAccountView} from "../View/SigninAccountView.ts";
import CompanyController from "./CompanyController.ts";
import Company from "../Model/Company.ts";

/**
 * Controller for the home page of the Game.
 *
 * Handles user actions like signing in and signing up, and connects
 * the views with the model. It creates accounts, loads user data,
 * and initializes the company after login.
 */
export default class HomePageController{

    #homePageView: HomePageView;
    #signInAccount?: SigninAccountView;
    #newAccount?: CreateNewAccountView;
    #companyController?: CompanyController;

    constructor(){
        this.#homePageView = new HomePageView(this);
    }


    /**
     * Opens the sign-in view.
     *
     * Creates the sign-in dialog if it does not exist, otherwise reopens it.
     */
    signIn():void{


        if(this.#signInAccount === undefined){
            this.#signInAccount= new SigninAccountView(this);
        }
        else {
            this.#signInAccount.open();
        }
        //here the controller of the company will be initialized.

    }

    /**
     * Opens the sign-up view.
     *
     * Creates the sign-up dialog if it does not exist, otherwise reopens it.
     */

    signUp():void{

        if(this.#newAccount === undefined) {
            this.#newAccount = new CreateNewAccountView(this);
        }else{
            this.#newAccount.open();
        }
    }

    /**
     * Signs in a user.
     *
     * Checks the account in the database and, if valid, loads the user's
     * company and starts automatic gift generation.
     *
     * @param username the entered username
     * @param password the entered password
     */

    async signInUser(username: string, password: string){


        const account  = new Account(username, password);

        const dbAccounts = await Account.loadAccount(account);

        const dbAccount = dbAccounts[0];

        this.#signInAccount= undefined;

        this.#companyController = new CompanyController(dbAccount.company);
    }

    /**
     * Creates a new account and company.
     *
     * Saves the account and its company to the database, then closes
     * the sign-up view.
     *
     * @param username the new username
     * @param password the new password
     * @param companyName the name of the company
     */
    async createAccount(username:string, password:string, companyName:string){

        /*
        I was thinking to do hashing here, but then issue was DBC, was failing
        Then I re-read MVC and figured that controller only calls stuff to happen
        So it just know what's happening but what really happens/logic is in model.
         */
        const account:Account = new Account(username, password);
        const company:Company = new Company(companyName,account);

        await Account.saveAccount(account, company);

        await Company.createCompany(company);

        this.#newAccount = undefined;
    }

}
