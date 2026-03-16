import HomePageController from "../Controller/HomePageController.ts";

export default class HomePageView{
    #homePageController: HomePageController;
    #homePageDiv!: HTMLDivElement;

    constructor(hpc:HomePageController){
        this.#homePageController = hpc;

        this.#homePageDiv = document.createElement("div");
        this.#homePageDiv.id = "home";
        document.querySelector('#app')!.appendChild(this.#homePageDiv);


        this.#homePageDiv.innerHTML =
            "<button id = 'sign-in'> Sign In </button> " +
            "<button id = 'sign-up'> Sign Up </button> "

        document.querySelector('#sign-in')!.addEventListener('click',():void=>this.#homePageController.signIn());
        document.querySelector('#sign-up')!.addEventListener('click',():void=>this.#homePageController.signUp());

    }
}