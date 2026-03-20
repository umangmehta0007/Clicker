import { expect, test } from 'vitest';
import Company from "../src/Model/Company";
import Account from "../src/Model/Account";



// in memory vs index db


test("Creating an account", ()=>{
    let a = new Account("umang", "mehta");
    let c = new Company("umang", a);
    let notified = false;

    c.registerListener({notify:()=> notified = true});
    notified = true;
    expect(notified).equals(true);

});

test("Saving and loading account", async () => {
    let a = new Account("Umang", "Mehta");
    let c = new Company("umang", a);

    await Account.saveAccount(a, c);

    const loaded = await Account.loadAccount(a);

    expect(loaded.length).toBeGreaterThan(0);
    expect(loaded[0].username).toBe(a.username);
});
