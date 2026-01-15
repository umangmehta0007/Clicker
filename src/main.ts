function assertPositiveNumber(val: number): asserts val is number{
    if(val<0){
        throw new Error("Value Must be positive");
    }
}

//asserts val is number : I can do asserts val is Object type tooo.


class Pokemon{

    #hp: number;
    static #damage = -1;

    constructor(intialHp: number){
        this.#hp = intialHp;
        this.#checkPokemon();
    }

    get hp(): number{
        return this.#hp;
    }

    #checkPokemon(){
        assertPositiveNumber(this.#hp);
    }

    /*
    No return type means void;
     */
    changeHealth(by: number) : number{
        if(this.#hp+by >= 0){
            this.#hp += by;
        }
        return this.#hp;
    }
    attack(other: Pokemon){
        other.changeHealth(Pokemon.#damage);
    }
}

let myPokemon = new Pokemon(19);