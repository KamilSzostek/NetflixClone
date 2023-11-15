import CryptoJS from "crypto-js";

export const encrypt = (clear: string) => {
  var cipher = CryptoJS.AES.encrypt(clear, `${process.env.CRYPTO_SECRET}`);
  return cipher.toString();
};

export const decrypt = (cipher: string) => {
  var decipher = CryptoJS.AES.decrypt(cipher, `${process.env.CRYPTO_SECRET}`);
  return decipher.toString(CryptoJS.enc.Utf8);
};
