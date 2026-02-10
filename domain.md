___
# Domain model for Gift Clicker
### Author: Umang Mehta
### Date: January 14, 2026
___

# Domain Model

```mermaid
classDiagram
        
        note for Company "Invariant Properties
             <ul> 
                <li> totalGifts >= 0
            </ul>
        "
    
    class Company{
        - list~Upgrades~ upgraded
        - int totalGifts
        
        +buyUpgrade(Upgrades u) void
        +addGifts() void 
        
    }
    note for Upgrades "Invariant Properties
             <ul> 
                <li>gifts_per_click>=1
            </ul>
        "
        
    class Upgrades{
        <<Abstract>>
        
        -int gifts_per_click         
        +giftsPerClick() int
    }

    note for Employee "Invariant Properties
             <ul> 
                  No class-specific invariants. 
            </ul>
        "
    class Employee{
    }
    note for Van "Invariant Properties
             <ul> 
                No class-specific invariants. 
            </ul>
        "
    class Van{
    }
    
    Company--* Upgrades
    Employee--|>Upgrades
    Van--|>Upgrades
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
* Interface listener was added but was restriced to be added in model diagram
* addtional getters were added to the code. 