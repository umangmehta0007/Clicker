
import Upgrades from "./Upgrades.ts"
import type Listener from "./Listener.ts"

export default class Company{

    #upgraded: Upgrades[];
    #totalGifts: number;
    #listeners: Array<Listener>;


    constructor(){
        this.#upgraded = [];
        this.#totalGifts = 0;
        this.#listeners = new Array<Listener>();
    }

    /*
    /added a getter to get total gifts rn, per click.
     */
    totalGifts(): number{
        return this.#totalGifts;
    }

    upgrades(): Array<Upgrades>{
        return this.#upgraded;
    }

    /*
     *This Method is a logic method whenever a click is done, this method changes
     * the total gifts calculated and adds additional click based on upgrades you have.
     */
    addGifts(){

        const totalPerClick: number = this.#upgraded.reduce(
            (acc:number, x)=> acc + x.giftsPerClick(),1);

        this.#totalGifts+= totalPerClick;

        this.#notifyAll();
    }

    /*
    This method is for the listener when a button is clicked.
     */
    buyUpgrade(u:Upgrades){
        this.#upgraded.push(u);

        /*
        This notifyAll here is just additonal part: I know it voilates mvp but this is just for visual purposes
        */
        this.#notifyAll();
    }


    /*
    Adding listeners to this Company
     */
    #notifyAll() {
        this.#listeners
            .forEach((l) => l.notify());
    }

    registerListener(listener: Listener){

        this.#listeners.push(listener);
    }

}