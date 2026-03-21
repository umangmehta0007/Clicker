import { expect, test } from 'vitest';
import Company from "../src/Model/Company";
import Account from "../src/Model/Account";
import Upgrades, {Addition} from "../src/Model/Upgrades";
import Buildings, {Amazon, Santa} from "../src/Model/Buildings";



// in memory vs index db


test("Saving and loading Company", async () => {
    let a = new Account("umangmehta", "umangmehta");
    let c = new Company("umang", a);

    await Account.saveAccount(a,c);
    await Company.createCompany(c);

    const loaded = await Company.getCompanyForAccount(a);

    expect(loaded).toBeDefined();
    expect(loaded.name).toBe(c.name);

});

test("Adding Gifts on Click Manually",async()=>{

    let a = new Account("u", "u");
    let c = new Company("u", a);

    await c.addClick();

    expect(c.totalGifts).equals(1);
})

test("Purchasing Upgrade", async () => {
    let a = new Account("mehta", "mehta");
    let c = new Company("mehta", a);
    await Account.saveAccount(a,c);
    await Company.createCompany(c);

    await c.addClick(); //adding one gift to buy purchase


    let u: Upgrades = new Addition(5,1,c);

    await c.buyUpgrade(u);

    expect(c.upgrades).contains(u);
});
test("Purchasing Buildings", async () => {
    let a = new Account("a", "a");
    let c = new Company("a", a);
    await Account.saveAccount(a,c);
    await Company.createCompany(c);

    await c.addClick(); //adding one gift to buy purchase

    let b: Buildings = new Santa(5,1,c);

    await c.buyBuildings(b);

    expect(c.buildings).contains(b);
});

test("Upgrades Notifies Listeners", async ()=>{

    let a = new Account("n", "n");
    let c = new Company("n", a);

    await Account.saveAccount(a,c);
    await Company.createCompany(c);

    let notify = false;

    await c.addClick(); //adding one gift to buy purchase
    let u: Upgrades = new Addition(5,1,c);

    c.registerListener({notify:()=>notify = true});

    await c.buyUpgrade(u);
    expect(notify).equals(true);
})

test("Add Gifts does nothing without buildings", async () => {

    let a = new Account("g", "g");
    let c = new Company("g", a);

    const before = c.totalGifts;

    await c.addGifts();

    expect(c.totalGifts).equals(before);
});

test("Add Gifts works with buildings", async () => {

    let a = new Account("franklin", "walter");
    let c = new Company("walter land", a);
    await Account.saveAccount(a,c);
    await Company.createCompany(c);

    await c.addClick();

    let b: Buildings = new Amazon(10, 1, c);

    await c.buyBuildings(b);

    await c.addGifts();

    expect(c.totalGifts).equals(10);
});


