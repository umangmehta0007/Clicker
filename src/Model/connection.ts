import { PGlite } from '@electric-sql/pglite';
import ddl from '../../create-tables.sql?raw'

// idb://2452-emon says to use IndexedDB as the backing storage for PGlite,
// this is "permanent" storage for us.

let src = import.meta.env.VITE_DATABASE_URL;

const pgliteDb = await PGlite.create(src);

if (src === 'memory://') {
    // we're going to load the DDL here, we're doing tests.
    db().exec(ddl)
}
export default function db() {
    return pgliteDb;
}