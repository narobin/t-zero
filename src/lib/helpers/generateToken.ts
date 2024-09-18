
export const generateToken = ((length: number = 64): Uint8Array => {

    const token = new Uint8Array(length);
    crypto.getRandomValues(token);

    return token;

});
