import { expect, test } from 'vitest';
import Company from "../src/Model/Company";
import Account from "../src/Model/Account";
import Upgrades, {Addition, Multiplier} from "../src/Model/Upgrades";


test("Saving and Loading Upgrade Addition", async () => {

    let a = new Account("abcdef", "abcdef");
    let c = new Company("abcdef", a);

    await Account.saveAccount(a,c);
    await Company.createCompany(c);
    await c.addClick();
    await c.addClick();


    const before = await Upgrades.getUpgradesForCompany(c);

    let b: Upgrades = new Addition(5, 1, c);
    let m: Upgrades = new Multiplier(5, 1, c);

    await c.buyUpgrade(b);
    await c.buyUpgrade(m);

    const after = await Upgrades.getUpgradesForCompany(c);

    expect(after.length).equals(before.length+2);
    expect(after).toBeDefined();
});
