
const MIN_KEY_SIZE = 16;
const MAX_KEY_SIZE = 24;
const IV_ARRAY_SIZE = 16;
const encoder = new TextEncoder();

const crypto = require("crypto");

function encrypt(toEncrypt, key) {
  const keyArraySize = getKeyArraySize(key);
  const sourceArray = incrementBytes(encoder.encode(key));
  const bytes = encoder.encode(toEncrypt);
  const length =
    sourceArray.length < keyArraySize ? sourceArray.length : keyArraySize;
  const numArray = new Uint8Array(keyArraySize);
  numArray.set(sourceArray.slice(0, length));
  const destinationArray = new Uint8Array(IV_ARRAY_SIZE);
  destinationArray.set(numArray.slice(0, IV_ARRAY_SIZE));

  const cipher = crypto.createCipheriv(
    keyArraySize === 16 ? "aes-128-cbc" : "aes-192-cbc",
    numArray,
    destinationArray
  );
  let ciphertext = cipher.update(bytes);
  ciphertext = Buffer.concat([ciphertext, cipher.final()]);
  ciphertext = ciphertext.toString("base64");
  return ciphertext;
}

function incrementBytes(bytes) {
  const newArray = bytes.map((byte, index) => {
    return byte + index + 1;
  });
  return newArray;
}

function getKeyArraySize(key) {
  return key.length > MIN_KEY_SIZE
    ? MAX_KEY_SIZE
    : MIN_KEY_SIZE;
}

module.exports = { encrypt, incrementBytes, getKeyArraySize };
