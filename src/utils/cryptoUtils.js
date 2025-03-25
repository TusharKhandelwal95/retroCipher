import CryptoJS from "crypto-js";

// Encrypts a message; if a passphrase is provided, AES-encrypt it.
export const encryptText = (message, passphrase) => {
  if (passphrase) {
    return CryptoJS.AES.encrypt(message, passphrase).toString();
  }
  return message;
};

// Decrypts a ciphertext with a given passphrase.
export const decryptText = (cipherText, passphrase) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, passphrase);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    return null;
  }
};

// Build a shareable link using the current hostname and port.
export const getShareableLink = (encodedPayload) => {
  let host = window.location.hostname;
  let port = window.location.port;
  return `http://${host}:${port}/?msg=${encodeURIComponent(encodedPayload)}`;
};
