

class Company{

    #name: string;
    #upgraded: Upgrades[];
    #totalGifts: number;


    constructor(name: string){
        this.#name = name;
        this.#upgraded = Upgrades[];
        this.#totalGifts = 0;
    }

    buy(u:Upgrades){

        this.#upgraded.push(u)

    }
    add(){
        let totalPerClick: number = 1;
        for(const x of this.#upgraded){
            totalPerClick+= x.giftsDelivered();
        }
        this.#totalGifts+= totalPerClick;
    }


}