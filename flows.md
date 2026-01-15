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
    clicked -.Gift Successfully Deliverd.->hs
    
    
```

## Purchasing Upgrades

While playing, you can buy upgrades.

```mermaid

flowchart
    hs[[GAME SCREEN]]
    upgrades{Processing Upgrade Purchase}
        
        hs==Employee Button==>upgrades
        hs==Van Button==>upgrades
        
        upgrades-.Successfully added the upgrade.->hs
        upgrades-.Not enough gifts to upgrade.->hs

```