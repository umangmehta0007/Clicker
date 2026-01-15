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
                <li> name != null
                <li> name.length() >=1
                <li>upgraded != null
                <li> loop: no elements(Upgrades) are null in upgraded
                <li> totalGifts >= 0
            </ul>
        "
    
    class Company{
        - String name
        - list~Upgrades~ upgraded
        - int totalGifts
        
        +buy(Upgrades u) void
        +sell(Upgrades u) void
        +add() int 
        
        %% adding gifts to total gifts depending on upgrades you have
        
        
        %% should I introduce getters for now or not needed.
        +name() String
        +totalGifts() int
        +upgrades() List~Upgrades~
        
    }
    note for Upgrades "Invariant Properties
             <ul> 
                Interface Don't have Invariant properties as don't hold any data
            </ul>
        "
        
    class Upgrades{
        <<Interface>>
        +giftsDelivered() int
    }

    note for Employee "Invariant Properties
             <ul> 
                <li> GIFTS_PER_CLICK >= 0
            </ul>
        "
    class Employee{
        - int GIFTS_PER_CLICK
        + giftsDelivered() int
    }
    
    note for Van "Invariant Properties
             <ul> 
                <li> GIFTS_PER_CLICK >= 0
            </ul>
        "
    class Van{
        - int GIFTS_PER_CLICK
        + giftsDelivered() int
    }
    
    Employee --o Van

    Company--* Employee
    Company--* Van
    
    
    Employee..|>Upgrades
    Van..|>Upgrades
```
