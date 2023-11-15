import CryptoJS from "crypto-js";
export const encrypt = (clear: string, secret: string) => {
  const cipher = CryptoJS.AES.encrypt(clear, secret);
  return cipher.toString();
};

export const decrypt = (cipher: string, secret:string) => {
  const decipher = CryptoJS.AES.decrypt(cipher, secret);
  const result = decipher.toString()
  return result
};
