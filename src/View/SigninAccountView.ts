import HomePageController from "../Controller/HomePageController.ts";

import {InvalidUsernameException, InvalidPasswordException, InvalidCredentialsExceptions} from "../Model/Account";

/**
 * View for signing in a user.
 *
 * Displays a dialog for username and password, sends the input to the
 * HomePageController, and shows errors if login fails.
 */
export class SigninAccountView{

    #homePageController: HomePageController;
    #dialog: HTMLDialogElement;

    constructor(hpc: HomePageController){
        this.#homePageController = hpc;

        this.#dialog = document.createElement('dialog');

        this.#dialog.id = 'sign-up';

/*
This stying of close was taken help from AI only for the close button design thing.
 */
        this.#dialog.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span id="error"></span>
            <button id="close-btn">close</button>
          </div><br />
        
          <label for="username">Username</label>
          <input type="text" id="username" />
        
          <label for="password">Password</label>
          <input type="text" id="password" />
        
          <button id="button">Log In</button>
        `;
      //   this.#dialog.innerHTML = `
      // <span id="error"></span><br />
      // <label for="username">Username</label>
      // <input type="text" id="username" />
      // <label for="password">Password</label>
      // <input type="text" id="password" />
      // <button> Log In </button>
      //  `
        this.#dialog.querySelector('#button')!.addEventListener('click',()  =>this.addAccount());
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

    /**
     * Attempts to sign in the user.
     *
     * Reads username and password from the dialog, sends them to the controller,
     * and handles errors by showing messages on the screen.
     */
    async addAccount(){
        let username = this.#dialog.querySelector<HTMLInputElement>("#username")!.value;
        let password = this.#dialog.querySelector<HTMLInputElement>("#password")!.value;

        try {
             const account = await this.#homePageController.signInUser(username, password);
            // assuming success, remove the dialog from the page
            this.#dialog.close();

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

            } else if( e instanceof InvalidCredentialsExceptions){
                this.#dialog.querySelector("#username")!
                    .setAttribute("style", "border-color:red;");
                this.#dialog.querySelector("#password")!
                    .setAttribute('style', 'border-color:red;');
                this.#dialog.querySelector("#error")!
                    .textContent = "Invalid credentials please double check id/password or try signing up";
            }
            else {
                // unexpected errors can be logged so that we can add them to the
                // try catch or figure out what the problem was.
                console.log("unexpected error " + e);
            }
        }

    }
}