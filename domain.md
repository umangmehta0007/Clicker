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
        
        %%Purchasing the upgrade and adding it to the list
        +buyUpgrade(Upgrades u) void
        
        %%this add method is responsible for calculating total gifts per click
        %%and adding them to total gifts per click.
        +addGifts() void 
        
    }
    note for Upgrades "Invariant Properties
             <ul> 
                <li>gifts_per_click>=1
                <li>price>=1
            </ul>
        "
        
    class Upgrades{
        <<Abstract>>
        
        -int gifts_per_click
        -int price
            
        %% This method would give the speciality of my upgrade
        %% Calculating the gifts/click as per the upgrade. 
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
