export default abstract class Upgrades{

    #gifts_per_click: number
    #price: number

    constructor(gifts_per_click: number, price: number){
        this.#gifts_per_click = gifts_per_click;
        this.#price = price;
    }

    giftsPerClick(): number{
        return this.#gifts_per_click;
    }
    price(): number{
        return this.#price;
    }
}