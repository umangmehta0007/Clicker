___
# Domain model for Gift Clicker
### Author: Umang Mehta
### Date: January 14, 2026
___

# Domain Model

```mermaid
classDiagram


    note for Account "Invariant Properties
             <ul> 
                No class-specific invariants
            </ul>
        "
    class Account{
        -~ string username
        - string password
        - Company company
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
        
        +purchases(Purchasable u) void
        +addGifts() void 
        
    }
    note for Purchasable "Invariant Properties
             <ul> 
                <li>price>=1
            </ul>
        "
        
    class Purchasable{
        <<Abstract>>
        
        -string name
        -number price
        -Company company
    }

    note for Employee "Invariant Properties
             <ul> 
                  gifts_per_click >=1 
            </ul>
        "
    class Employee{
        -number gifts_per_click 
    }
    note for Van "Invariant Properties
             <ul> 
                  gifts_per_click >=1 
            </ul>
        "
    class Van{
        -number gifts_per_click
    }

    note for Santa "Invariant Properties
             <ul> 
                  clicks_per_sec >=1 
            </ul>
        "
    class Santa{
        -number clicks_per_sec
    }
    note for Amazon "Invariant Properties
             <ul> 
                  clicks_per_sec >=1 
            </ul>
        "
    class Amazon{
        -number clicks_per_sec
    }
    
    Account o--* Company
    Company o--* Purchasable
    
    Employee--|>Purchasable
    Van--|>Purchasable
    Santa--|>Purchasable
    Amazon--|>Purchasable
    
```
## Methods: 
* `giftsPerClick()` :  returns the number of gifts contributed per click by this upgrade
* `buyUpgrade(Upgrades u)` : adds a purchased upgrade to the company’s upgrades list
* `addGifts()`: sums gifts per click from all upgrades and increments totalGifts.

### Modified the domain model: 
* Added a super class instead of interface 
* removed invariants where it was checking null as in TypeScript we don't need to check for the null 
* super class had properties for price/cost of upgrade and gifts delivered per click made by that upgrade
* relationships were redefined"


### Modifications for Phase 1 implementations: 
* Interface listener was added but was restricted to be added in model diagram
* additional getters were added to the code. 
* Some Styling was done using chatGPT.
* Testing was implemented and invariants were added using assertions. 