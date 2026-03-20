import HomePageController from "../Controller/HomePageController.ts";
import {DuplicateUsernameException, InvalidPasswordException, InvalidUsernameException} from "../Model/Account.ts";
import {CompanyAlreadyExistsError, InvalidNameException} from "../Model/Company.ts";

export class CreateNewAccountView{

    #homePageController: HomePageController;
    #dialog: HTMLDialogElement;

    constructor(hpc: HomePageController){
        this.#homePageController = hpc;

        this.#dialog = document.createElement('dialog');

        this.#dialog.id = 'sign-up';

        this.#dialog.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span id="error"></span>
            <button id="close-btn">✖</button>
          </div><br />
        
          <label for="username">Username</label>
          <input type="text" id="username" />
        
          <label for="password">Password</label>
          <input type="text" id="password" />
        
          <label for="company">Company Name</label>
          <input type="text" id="company" />
        
          <button id="signup">Create Account</button>
        `;

        this.#dialog.querySelector('#signup')!
            .addEventListener('click', () => this.addAccount());

        this.#dialog.querySelector('#close-btn')!
            .addEventListener('click', () => this.closeDialog());
        document.body.appendChild(this.#dialog)
        // dialogs are hidden by default, show yourself:
        this.#dialog.show();


    }
    open() {
        this.#dialog.show();
    }
    closeDialog() {
        this.#dialog.close();
    }

    async addAccount(){
        let username = this.#dialog.querySelector<HTMLInputElement>("#username")!.value;
        let password = this.#dialog.querySelector<HTMLInputElement>("#password")!.value;
        let companyName = this.#dialog.querySelector<HTMLInputElement>("#company")!.value;



        try {

            await this.#homePageController.createAccount(username, password, companyName);
            // assuming success, remove the dialog from the page
            document.body.removeChild(this.#dialog)
        } catch (e: any) {
            // handle InvalidHPExceptions
            if (e instanceof InvalidUsernameException) {
                // get the input field and colour it red to indicate an error.
                this.#dialog.querySelector("#username")!
                    .setAttribute("style", "border-color:red;");
                this.#dialog.querySelector("#error")!
                    .textContent = "Invalid username must have at least one letter (e.g., admin).";
            } else if (e instanceof InvalidPasswordException) {
                this.#dialog.querySelector("#password")!
                    .setAttribute('style', 'border-color:red;');
                this.#dialog.querySelector("#error")!
                    .textContent = "Invalid passwords must have at least one letter (e.g., admin).";
            } else if(e instanceof InvalidNameException){
                this.#dialog.querySelector("#company")!
                    .setAttribute('style', 'border-color:red;');
                this.#dialog.querySelector("#error")!
                    .textContent = "Invalid Company name must have at least one letter (e.g., admin).";
            }
            else if(e instanceof CompanyAlreadyExistsError){
                this.#dialog.querySelector("#company")!
                    .setAttribute('style', 'border-color:red;');
                this.#dialog.querySelector("#error")!
                    .textContent = "Company already exists. Please choose a different name for the Company";
            }
            else if(e instanceof DuplicateUsernameException){
                this.#dialog.querySelector("#username")!
                    .setAttribute('style', 'border-color:red;');
                this.#dialog.querySelector("#error")!
                    .textContent = "Account already exists.Please choose a different username for the Account";
            }

            else {
                // unexpected errors can be logged so that we can add them to the
                // try catch or figure out what the problem was.
                console.log("unexpected error " + e);
            }
        }

    }
}