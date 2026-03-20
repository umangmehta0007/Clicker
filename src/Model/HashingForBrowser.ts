export default class HashingForBrowser {

    async #getKeyMaterial(pass: string): Promise<CryptoKey> {
        const enc = new TextEncoder();
        return window.crypto.subtle.importKey(
            "raw",
            enc.encode(pass),
            { name: "PBKDF2" },
            false,
            ["deriveBits","deriveKey"],
        );
    }

    async #getDerivedBits(password: string, salt: Uint8Array) {
        const keyMaterial = await this.#getKeyMaterial(password);

        return window.crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                salt,
                iterations: 100000,
                hash: "SHA-256",
            },
            keyMaterial,
            256,
        );
    }

    #toHex(buffer: ArrayBuffer): string {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        const innerSalt = new TextEncoder().encode(salt);
        const bits = await this.#getDerivedBits(password, innerSalt);
        return this.#toHex(bits);
    }
}