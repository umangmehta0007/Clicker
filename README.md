___
# Gift Clicker
### Author: Umang Mehta (mehtau@myumanitoba.ca)
### Date: January 14, 2026
___

# Overview

Gift Clicker is an implementation of clicker games (also called "idle" or [incremental games](https://en.wikipedia.org/wiki/Incremental_game)) for COMP 2452.
It is an event-driven program where each click corresponds to a successful gift delivery to our customer (like [Amazon](https://www.amazon.ca) or [FedEx](https://www.fedex.com/en-ca/home.html)).

*The Project was styled using css, and the code was generate by [chatGPT](https://en.wikipedia.org/wiki/ChatGPT)*

You can expand your company with upgrades, limited to **two** for the first phase:

* **Employee:** Adds 5 gifts per click
* **Van:** Adds 10 gifts per click

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