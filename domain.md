___
# Domain model for Gift Clicker
### Author: Umang Mehta
### Date: January 14, 2026
___

# Domain Model

```mermaid
classDiagram


    note for Account "Invariant Properties
            
            ->No class-specific invariants
        "
    class Account{
        -~ string username
        - string password
        - Company company
        
        +loadAccount(account:Account) Promise<list<Account>>
        +saveAccount(account: Account, company:Company) Promise<void>
        
    }
        note for Company "Invariant Properties
             <ul> 
                <li> totalGifts >= 0
            </ul>
        "
    
    class Company{
        -~ string name
        - number totalGifts
        - list~Purchasable~ purchases
        - Account account
        
        -saveCompany(): Promise<Company>
        -clicksFromAddition():number
        -clicksFromMultiplication():number
        -cpsFromBuildings(): number

        +createCompany(company:Company):Promise<Company>
        +getCompanyForAccount(account: Account):Promise<Company>

        +buyUpgrade(u:Upgrades)
        +buyBuildings(b:Buildings)

        +addClick():void
        +addGifts(): void
        
    }

    note for Upgrades "Invariant Properties
             <ul> 
                <li>price>=1</li>
                <li>clicks>=1</li>

            </ul>
        "

    class Upgrades{
        <<Abstract>>

        -~number id
        -number price
        -number clicks
        -Company company
        
        +saveUpgrades(upgrade:Upgrades): void
        +getUpgradesForCompany(company: Company): Promise<list(Upgrades)>
        
    }

    note for Buildings "Invariant Properties
             <ul> 
                <li>price>=1</li>
                <li>cps>=1</li>

            </ul>
        "
        
    class Buildings{
        <<Abstract>>
        
        -~number id
        -number price
        -number cps
        -Company company

        +saveBuildings(building:Buildings): void
        +getBuildingsForCompany(company: Company): Promise<list(Buildings)>

    }

    note for Addition "Invariant Properties
            
            ->No class-specific invariants
        "
    class Addition{
    }
    note for Multiplier "Invariant Properties
            
            ->No class-specific invariants
        "
    class Multiplier{
    }

    note for Santa "Invariant Properties
            
            ->No class-specific invariants
        "
    class Santa{
    }
    
    note for Amazon "Invariant Properties
          
            ->No class-specific invariants
        "
    class Amazon{
    }
    
    Company "1" o--* "*" Upgrades
    Company "1" o--* "*" Buildings

    Account "1" o--*"1" Company


    Addition--|>Upgrades
    Multiplier--|>Upgrades
    Santa--|>Buildings
    Amazon--|>Buildings
    
```
### Modifications for Phase 2 Implementation: 
Modifications for Phase 2 Implementation:
* Added database support so Accounts, Companies, Upgrades, and Buildings can be saved and loaded 
* Gave Upgrades and Buildings an id and fixed saving so they don’t get duplicated 
* Kept Company linked to Account 1-1 Relation and made Company hold its 1 to many relationship with upgrades and buildings	
* Used Factory classes to create upgrades and buildings instead of creating them directly.
* Added an inventory system to load default upgrades and buildings	
* Implemented game logic for clicks and automatic gift generation using buildings and upgrades


### New Methods in `Company`

* `saveCompany()` - saves the current company state (gifts, upgrades, buildings) to the database
* `createCompany()` – creates a new company entry in the database
* `getCompanyForAccount()` – loads a company associated with a given account

* `addClick()` – adds gifts manually when user clicks 
* `addGifts()` – adds gifts automatically based on buildings and upgrades

* `clicksFromAddition()` – calculates extra gifts from addition upgrades 
* `clicksFromMultiplication()` – calculates multiplier effect from upgrades 
* `cpsFromBuildings()` – calculates gifts per second from buildings