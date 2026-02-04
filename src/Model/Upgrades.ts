export default abstract class Upgrades{

    #gifts_per_click: number

    constructor(gifts_per_click: number){
        this.#gifts_per_click = gifts_per_click;
    }

    giftsPerClick(): number{
        return this.#gifts_per_click;
    }
}