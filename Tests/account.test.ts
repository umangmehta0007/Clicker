import { expect, test } from 'vitest';
import Company from "../src/Model/Company";
import Account from "../src/Model/Account";

test("Saving and loading account", async () => {
    let a = new Account("Umang", "Mehta");
    let c = new Company("umang", a);

    await Account.saveAccount(a, c);
    await Company.createCompany(c);

    const loaded = await Account.loadAccount(a);

    expect(loaded).toBeDefined();
    expect(loaded[0].username).toBe(a.username);
});