"use client";

import { useState, useRef } from "react";
import CryptoJS from "crypto-js";
import validator from "validator";

const EncryptionDemo = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [decryptInput, setDecryptInput] = useState<string>("");
  const [decryptedText, setDecryptedText] = useState<string>("");
  const [encryptionMethod, setEncryptionMethod] = useState<string>("AES");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mirroredTextRef = useRef<HTMLDivElement>(null);

  const handleEncrypt = () => {
    let encrypted = "";
    if (encryptionMethod === "AES") {
      encrypted = CryptoJS.AES.encrypt(plainText, "secret-key").toString();
    } else if (encryptionMethod === "DES") {
      encrypted = CryptoJS.DES.encrypt(plainText, "secret-key").toString();
    }
    setEncryptedText(encrypted);
    setPlainText("");
  };

  const handleDecrypt = () => {
    let decrypted = "";
    try {
      if (encryptionMethod === "AES") {
        decrypted = CryptoJS.AES.decrypt(decryptInput, "secret-key").toString(CryptoJS.enc.Utf8);
      } else if (encryptionMethod === "DES") {
        decrypted = CryptoJS.DES.decrypt(decryptInput, "secret-key").toString(CryptoJS.enc.Utf8);
      }

      // Sanitize the decrypted output for safe display
      const sanitizedDecryptedText = validator.escape(decrypted);

      setDecryptedText(sanitizedDecryptedText); // Display the sanitized output
    } catch (error) {
      alert("Decryption failed. Please check your input.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white p-8 selection-style">
      <h1 className="text-3xl font-bold underline decoration-green-500 mb-8">Data Encryption Visual Demo</h1>

      <div className="w-full max-w-full space-y-8 relative">
        {/* Encryption Text Input */}
        <div className="relative w-full">
          {/* Mirrored Glowing Text */}
          <div
            ref={mirroredTextRef}
            className="absolute inset-0 p-4 bg-transparent text-white opacity-80 z-0 text-custom-xl font-bold overflow-hidden selection-style"
          >
            <p className="break-all">{plainText}</p>
          </div>

          {/* Actual Text Box with Custom Background and Font Size */}
          <div className="relative z-10 bg-input-bg rounded-lg p-4 backdrop-blur-md">
            <textarea
              ref={textAreaRef}
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Enter text to encrypt"
              className="w-full h-auto p-4 bg-transparent border border-white rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white text-[30px] resize-none caret-thick selection-style"
            ></textarea>
          </div>
        </div>

        {/* Encryption Method Selection */}
        <div className="w-full">
          <label className="block text-gray-300 mb-2">Select Encryption Method:</label>
          <select
            value={encryptionMethod}
            onChange={(e) => setEncryptionMethod(e.target.value)}
            className="w-full p-2 bg-transparent border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white bg-black selection-style"
          >
            <option value="AES">AES</option>
            <option value="DES">DES</option>
          </select>
        </div>

        {/* Encrypt Button */}
        <button
          onClick={handleEncrypt}
          className="w-full p-3 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-black transition selection-style"
        >
          Encrypt Text
        </button>

        {/* Encrypted Text Output */}
        {encryptedText && (
          <div className="relative bg-input-bg rounded-lg p-4 backdrop-blur-md selection-style">
            <p className="text-lg font-semibold mb-2">Encrypted Text:</p>
            <p className="break-all">{encryptedText}</p>
          </div>
        )}

        {/* Decrypt Text Input */}
        <div className="relative w-full text-white">
          {/* Mirrored Glowing Text */}
          <div
            ref={mirroredTextRef}
            className="absolute inset-0 p-4 bg-transparent text-white opacity-80 z-0 text-custom-xl font-bold overflow-hidden selection-style"
          >
            <p className="break-all">{decryptInput}</p>
          </div>

          {/* Actual Decryption Box */}
          <div className="relative z-10 bg-input-bg rounded-lg p-4 backdrop-blur-md">
            <textarea
              ref={textAreaRef}
              value={decryptInput}
              onChange={(e) => setDecryptInput(e.target.value)}
              placeholder="Paste encrypted text to decrypt"
              className="w-full h-auto p-4 bg-transparent border border-white rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white text-[30px] resize-none caret-thick selection-style"
            ></textarea>
          </div>
        </div>

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          className="w-full p-3 bg-transparent border border-white text-white rounded-lg hover:bg-white hover:text-black transition selection-style"
        >
          Decrypt Text
        </button>

        {/* Decrypted Text Output */}
        {decryptedText && (
          <div className="relative bg-input-bg rounded-lg p-4 backdrop-blur-md selection-style">
            <p className="text-lg font-semibold mb-2">Decrypted Text:</p>
            <p>{decryptedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncryptionDemo;
