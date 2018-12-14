/**
 * generate a random string of any given length
 * @param strLength the length of the string to be generated
 * @returns {string} a random string
 */
function generateRandomString(strLength) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < strLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * generate a random  natural number between 1-10 based on the current time
 * @returns {number} the random integer
 */
function generateRandomNautralNumber() {
    return (Date.now() % 10) + 1;
}

export default{generateRandomString, generateRandomNautralNumber};