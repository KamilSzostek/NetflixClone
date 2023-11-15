import CryptoJS from "crypto-js";

export const encrypt = (clear: string) => {
  const cipher = CryptoJS.AES.encrypt(clear, `${process.env.CRYPTO_SECRET}`);
  return cipher.toString();
};

export const decrypt = (cipher: string) => {
  const decipher = CryptoJS.AES.decrypt(cipher, `${process.env.CRYPTO_SECRET}`);
  const result = decipher.toString(CryptoJS.enc.Utf8)
  return result
};
