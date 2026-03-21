import { expect, test } from 'vitest';
import Company from "../src/Model/Company";
import Account from "../src/Model/Account";
import Buildings, {Amazon} from "../src/Model/Buildings";


test("Saving and Loading Buildings", async () => {

    let a = new Account("b1", "b1");
    let c = new Company("b1", a);

    await Account.saveAccount(a,c);
    await Company.createCompany(c);
    await c.addClick();

    const before = await Buildings.getBuildingsForCompany(c);

    let b: Buildings = new Amazon(5, 1, c);
    await c.buyBuildings(b);

    const after = await Buildings.getBuildingsForCompany(c);

    expect(after.length).toBe(before.length + 1);
    expect(after).toBeDefined();
});

test("Get Santa from inventory", async () => {

    const data:any = await Buildings.getSanta();

    expect(data).toBeDefined();
    expect(data.types).equals("SANTA");
});
test("Get Amazon from inventory", async () => {

    const data:any = await Buildings.getAmazon();

    expect(data).toBeDefined();
    expect(data.types).equals("AMAZON");
});