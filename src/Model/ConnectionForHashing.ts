import HashingForBrowser from "./HashingForBrowser";
import HashingForTest from "./HashingForTest";
import type Hashing from "./Hashing.ts";

export function getHasher():Hashing {
    if (import.meta.env.VITE_DATABASE_URL === "memory://") {
        return new HashingForTest();
        //return new HashingForBrowser();
    }
    return new HashingForBrowser();
}