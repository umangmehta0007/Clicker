import HomePageController from "./Controller/HomePageController.ts";
import ddl from '../create-tables.sql?raw'
import csv from './model.csv?raw'
import db from './Model/connection.ts'
// load the tables into the database:

/*
This mehtod below takes the raw string and converts the string into matrix, which we'll be injecting into our controller
 */
function exec(csv:string) {
    let matrix: number[][] = [];
    const lines = csv.trim().split("\n");

    for (let line of lines) {
        const parts = line.split(",");

        const row: number[] = [];
        for (let value of parts) {
            row.push(Number(value));
        }

        matrix.push(row);
    }
    return matrix;
}

function dexec(numerator: number[][]): number[] {
    const denominator: number[] = [];

    for (let row of numerator) {
        let sum = row.reduce((acc, val) => acc + val, 0);
        denominator.push(sum);
    }

    return denominator;
}
const numerator = exec(csv);
const denominator = dexec(numerator);
db().exec(ddl)

/*
Let's work form here
 */
new HomePageController(numerator, denominator);
