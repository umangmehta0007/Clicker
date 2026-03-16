
import HomePageController from "./Controller/HomePageController.ts";
import ddl from '../create-tables.sql?raw'
import db from './Model/connection.ts'

// load the tables into the database:
db().exec(ddl)

new HomePageController();
