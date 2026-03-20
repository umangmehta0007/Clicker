
import HomePageController from "./Controller/HomePageController.ts";
import ddl from '../create-tables.sql?raw'
import db from './Model/connection.ts'
import Inventory from "./Model/Inventory.ts";

// load the tables into the database:
db().exec(ddl)

Inventory.loadInventory();

new HomePageController();
