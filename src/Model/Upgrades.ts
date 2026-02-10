import assert from "../assertions.ts";

export default abstract class Upgrades{

    #gifts_per_click: number

    constructor(gifts_per_click: number){
        this.#gifts_per_click = gifts_per_click;
        this.#checkUpgrades();
    }
    giftsPerClick(): number{
        return this.#gifts_per_click;
    }

    #checkUpgrades(){
        assert(this.#gifts_per_click>=1, "Number of clicks by upgrades should always be greater than equal to one");
    }
}

