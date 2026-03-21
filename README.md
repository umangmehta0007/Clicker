___
# Gift Clicker
### Author: Umang Mehta (mehtau@myumanitoba.ca)
### Date: January 14, 2026
___

# Overview

Gift Clicker is an implementation of clicker games (also called "idle" or [incremental games](https://en.wikipedia.org/wiki/Incremental_game)) for COMP 2452.
It is an event-driven program where each click corresponds to a successful gift delivery to our customer (like [Amazon](https://www.amazon.ca) or [FedEx](https://www.fedex.com/en-ca/home.html)).

### AI DISCLOUSRE:

*The Project was styled using css, and the code was generate by [chatGPT](https://en.wikipedia.org/wiki/ChatGPT)*


ChatGPT was used solely for basic HTML/UI support, including the structure of the sign-in/sign-up dialogs, purchasable buttons (Addition, Multiplier, Santa, Amazon), and the close (✖) button design.

All core logic, architecture, and implementation were completed independently.

# Playing The Clicker Game: 

### Implementation Details 1 : SIGN IN / SIGN UP

* Users can create an account by entering a username, password, and company name. 
* The system validates the input (no empty fields and unique username). 
* Passwords are securely stored using hashing before saving to the database. 
* When signing up, both the account and its company are created together. 
* For sign in, the system checks the entered credentials against stored data. 
* If valid, the user is logged in and their company data is loaded.

### Implementation Details 2: Purchasing/Buying
* Users buy upgrades and buildings using gifts and gifts are deducted after purchase 
* Items are added to the company and Purchases are saved to the database

### Implementation Details 3 : Running
* Clicks per second (CPS) are calculated based on buildings, with upgrades modifying their output.
* Addition upgrades increase the base CPS, and multiplier upgrades scale the total CPS.
* Total Gifts were generated only from buildings and their associated upgrades, while manual clicks (addClick) increment gifts independently.

### You can expand your company with upgrades, limited to **two** for the first phase:

* **Addition:** Powers 5 click by Addition
* **Multiplier:** Powers 10 clicks by Multiplication.

Expansion in Phase 2 was made by Adding buildings: 

* **Santa:** Powers 5 clicks per sec.
* **Amazon:** Powers 10 clicks per sec.

**With Combination of upgrades and Buildings, gifts will be boosted.**


# Running

This project is a Node.js project using Vite. You can run it on the command
line using `npx` (if you don't have npm installed):

```bash
npx vite
```

# Running the test

We're using Vitest Framework to run our test. You can run it on command line
using `npx vitest`: 

```bash
npx vitest
```

### To run with coverage you can use `npx vitest run --coverage`

```bash
npx vitest run --coverage
```

And then open your web browser and go to the address printed out by Vite.


# Domain model and flow diagrams

* You can find my domain model in `domain.md`.
* You can find my flow diagrams in `flows.md`.