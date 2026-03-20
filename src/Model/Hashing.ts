
export default interface Hashing {
    hashPassword(password:string, salt:string):Promise<string>;
}
