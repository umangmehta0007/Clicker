import { expect, test } from 'vitest';
import Company from "../src/Model/Company";
import Upgrades from "../src/Model/Upgrades";
import Addition from "../src/Model/Addition";

test("Testing a click to deliver gift", ()=>{
    let c = new Company();
    c.addGifts();
    expect(c.totalGifts()).equals(1);

})
test("Adding an Upgrade", ()=>{
    let c = new Company();
    let emp : Upgrades = new Addition(5);
    c.buyUpgrade(emp);

    expect(c.upgrades()).contains(emp);
})

test("Company Notifies Listeners", ()=>{
    let notify = false;
    let c = new Company();
    c.registerListener({notify:()=>notify = true});

    c.addGifts();

    expect(notify).equals(true);

})

test("Upgrades Notifies Listeners", ()=>{
    let notify = false;
    let c = new Company();
    let e: Upgrades = new Addition(5);
    c.registerListener({notify:()=>notify = true});

    c.buyUpgrade(e);
    expect(notify).equals(true);
})