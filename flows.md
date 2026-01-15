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
        
    hs[[HOME SCREEN]]
    clicked{Adding Delivered Gifts}
    
    hs == Gift Button ==> clicked
    clicked -.Gift Successfully Deliverd.->hs
    
    
```

## Purchasing Upgrades

```mermaid

flowchart
    hs[[HOME SCREEN]]
    upgrades{Processing Purchase}
        
        hs==Employee Button==>upgrades
        hs==Van Button==>upgrades
        
        upgrades-.Successfully added the upgrade.->hs
        upgrades-.Not enough gifts to upgrade.->hs

```

## Running the game

```mermaid

flowchart
    hs[[HOME SCREEN]]
    %%dg[Deliver Gifts]
    %%ug[upgrade]
    clicked{Adding Delivered Gifts}
    upgrades{Processing Purchase}

    hs == Gift Button ==> clicked
    
    hs==Employee Button==>upgrades
    hs==Van Button==>upgrades

    upgrades-.Successfully added the upgrade.->hs
    upgrades-.Not enough gifts to upgrade.->hs
    clicked -.Gift Successfully Deliverd.->hs


```