var SHA256 = require("crypto-js/sha256");

class Master {
  randomString(strLength, charSet) {
    var result = [];

    strLength = strLength || 5;
    charSet =
      charSet ||
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    while (strLength--) {
      result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
    }

    return result.join("");
  }
}

export default new Master();
