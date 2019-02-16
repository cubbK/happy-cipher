import bitwise from "bitwise";
const randomNumber = require("random-number-csprng");

function stringToBinary(str, spaceSeparatedOctets) {
  function zeroPad(num) {
    return "00000000".slice(String(num).length) + num;
  }

  return str.replace(/[\s\S]/g, function(str) {
    str = zeroPad(str.charCodeAt().toString(2));
    return !1 == spaceSeparatedOctets ? str : str + " ";
  });
}

function binaryToString(str) {
  // Removes the spaces from the binary string
  str = str.replace(/\s+/g, "");
  // Pretty (correct) print binary (add a space every 8 characters)
  str = str.match(/.{1,8}/g).join(" ");

  var newBinary = str.split(" ");
  var binaryCode = [];

  for (let i = 0; i < newBinary.length; i++) {
    binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
  }

  return binaryCode.join("");
}

function encryptBits(bits, key) {
  let encryptedBits = "";

  const numberOfTimesToMultiplyKey = bits.length / key.length + 1;

  let longEnoughKey = key;

  for (let i = 0; i < numberOfTimesToMultiplyKey; i++) {
    longEnoughKey = longEnoughKey + key;
  }

  longEnoughKey;

  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === longEnoughKey[i]) {
      encryptedBits = encryptedBits + "0";
    } else {
      encryptedBits = encryptedBits + "1";
    }
  }
  return encryptedBits;
}

async function encryptText(text) {
  const plainTextBits = stringToBinary(text, false);

  let keyBits = "";

  for (let i = 0; i < 256; i++) {
    const number = await randomNumber(0, 1);
    keyBits = keyBits + number;
  }

  const encryptedBits = encryptBits(plainTextBits, keyBits);

  const encryptedText = binaryToString(encryptedBits);
  const keyText = binaryToString(keyBits);

  return { text: encryptedText, key: keyText };
}

async function unencryptText(text: string, key: string) {
  const textBits = stringToBinary(text, false);
  const keyBits = stringToBinary(key, false);

  const unencryptedTextBits = unencryptBits(textBits, keyBits);

  const unencryptedText = binaryToString(unencryptedTextBits);
  return {
    text: unencryptedText
  }
}

function unencryptBits(bits, key) {
  let unencryptedBits = "";

  const numberOfTimesToMultiplyKey = bits.length / key.length + 1;

  let longEnoughKey = key;

  for (let i = 0; i < numberOfTimesToMultiplyKey; i++) {
    longEnoughKey = longEnoughKey + key;
  }

  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === longEnoughKey[i]) {
      unencryptedBits = unencryptedBits + "0";
    } else {
      unencryptedBits = unencryptedBits + "1";
    }
  }
  return unencryptedBits;
}

async function main() {
  const plainText = "hey yoou je ne parles francays";
  const encryptedText = await encryptText(plainText);

  const unencryptedText = await unencryptText(
    encryptedText.text,
    encryptedText.key
  );

  unencryptedText
}

main();
