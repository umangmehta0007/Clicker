___
# Flows of Interaction for Gift Clicker
### Author: Umang Mehta
### Date: January 14, 2026
___

# Flows of interaction

# Logging in or Creating an Account

```mermaid

flowchart
    
    ls[[Home Screen]]
    gs[[Game Screen]]
    signin[Sign In]
    signuo[Sign Up]
    
    credentials{Validating Credentials}
    creation{Processing Signup}
    
    ls== Sign In Button ==>signin
    ls== Sign Up Button ==>signuo
    
    signin==Entering Username and Passoword==>credentials
    credentials -.Invalid Username/Password.->ls
    credentials -.Success Login.->gs

    signuo==Entering username and passowrd ==>creation
    creation -.Account Already exists.->ls
    creation -.Successfully Created Account.->ls




```


## Playing game (Delivering Gifts)
This starts with your homescreen/welcome screen of the game.

```mermaid

flowchart
        
    hs[[GAME SCREEN]]
    clicked{Process Gift Click}
    lg{Log out}
    
    hs == Gift Button ==> clicked
    hs == Logout Button ==> lg

    clicked -.Gift Successfully Delivered.->hs
    lg -.Signing Out to Home Screen.->hs



```

## Purchasing Upgrades or Buildings

While playing, you can purchase building and upgrades.

```mermaid

flowchart
    hs[[GAME SCREEN]]
    upgrades{Processing Purchase}
        
        hs==Addition Button==>upgrades
        hs==Multiplier Button==>upgrades
        hs==Santa Button==>upgrades
        hs==Amazon Button==>upgrades


    upgrades-.Successfully added.->hs
    upgrades-.Not Enough Gifts to Purchase.->hs


```
### Changes made for phase 1 implementation: 

* `Not enough gifts to upgrade` was successfully removed as per MVP.

### Changes made for phase 2 design:
* `Santa` and  `Amazon` were the buildings button added that now could be purchased, along with existing upgrades `Multiplier` and `Addition`.
* `Not enough gifts to Purchase` was successfully added. 

