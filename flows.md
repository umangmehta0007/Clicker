___
# Flows of Interaction for Gift Clicker
### Author: Umang Mehta
### Date: January 14, 2026
___

# Flows of interaction

## Playing game (Delivering Gifts)

This starts with your homescreen/welcome screen of the game.

```mermaid

flowchart
        
    hs[[GAME SCREEN]]
    clicked{Process Gift Click}
    
    hs == Gift Button ==> clicked
    clicked -.Gift Successfully Delivered.->hs
    
    
```

## Purchasing Upgrades

While playing, you can buy upgrades.

```mermaid

flowchart
    hs[[GAME SCREEN]]
    upgrades{Processing Purchase}
        
        hs==Employee Button==>upgrades
        hs==Van Button==>upgrades
        hs==Santa Button==>upgrades
        hs==Amazon Button==>upgrades


    upgrades-.Successfully added.->hs
    upgrades-.Not Enough Gifts to Purchase.->hs


```
### Changes made for phase 1 implementation: 

* `Not enough gifts to upgrade` was successfully removed as per MVP.

### Changes made for phase 2 design:
* `Santa` and  `Amazon` were the buildings button added that now could be purchased, along with existing upgrades `Van` and `Employee`.
* `Not enough gifts to Purchase` was successfully added. 

