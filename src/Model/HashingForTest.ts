export default class HashingForTest {

    async hashPassword(password: string, salt: string): Promise<string> {
        return password;
    }
}