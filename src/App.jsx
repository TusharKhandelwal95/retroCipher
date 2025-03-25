import { useState, useEffect } from "react";
import { encryptText, decryptText, getShareableLink } from "./utils/cryptoUtils";
import Header from "./components/Header";
import ProcessingSpinner from "./components/ProcessingSpinner";
import SenderForm from "./components/SenderForm";
import EncryptedLink from "./components/EncryptedLink";
import Receiver from "./components/Receiver";

const App = () => {
  // State variables
  const [message, setMessage] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [encryptedLink, setEncryptedLink] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [storedPayload, setStoredPayload] = useState(null);
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [isReceiver, setIsReceiver] = useState(false);
  const [inputPassphrase, setInputPassphrase] = useState("");
  const [messageConsumed, setMessageConsumed] = useState(false);
  const [animateClass, setAnimateClass] = useState("");
  const [processing, setProcessing] = useState(false);

  // Encrypt Message with a delay
  const encryptMessage = () => {
    if (!message) return alert("Enter a message!");
    setProcessing(true);
    setTimeout(() => {
      let payload;
      if (passphrase) {
        const cipherText = encryptText(message, passphrase);
        payload = { encrypted: true, message: cipherText };
      } else {
        payload = { encrypted: false, message };
      }
      const encodedPayload = btoa(JSON.stringify(payload));
      const link = getShareableLink(encodedPayload);
      setEncryptedLink(link);
      setProcessing(false);
    }, 500);
  };

  // Decode payload from URL
  const decodePayload = (encodedMessage) => {
    try {
      const decodedStr = atob(decodeURIComponent(encodedMessage));
      const payload = JSON.parse(decodedStr);
      setStoredPayload(payload);
      window.history.replaceState({}, document.title, "/");
    } catch (error) {
      setStoredPayload({ encrypted: false, message: "❌ Invalid or corrupted message." });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedMessage = params.get("msg");
    if (encodedMessage) {
      decodePayload(encodedMessage);
      setIsReceiver(true);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Reveal message with a delay
  const revealMessage = () => {
    if (storedPayload) {
      setProcessing(true);
      setTimeout(() => {
        if (storedPayload.encrypted) {
          if (!inputPassphrase) {
            alert("Please enter the passphrase to reveal the message!");
            setProcessing(false);
            return;
          }
          const decrypted = decryptText(storedPayload.message, inputPassphrase);
          if (!decrypted) {
            setDecryptedMessage("💥 Wrong passphrase! The message exploded into cosmic dust!");
          } else {
            setDecryptedMessage(decrypted);
          }
        } else {
          setDecryptedMessage(storedPayload.message);
        }
        setShowDecrypted(true);
        setProcessing(false);
        setTimeout(() => {
          setAnimateClass("burning");
          setDecryptedMessage("💥 Kaboom! Your secret has been vaporized into the digital abyss!");
          setShowDecrypted(false);
          setStoredPayload(null);
          setMessageConsumed(true);
        }, 20000);
      }, 500);
    }
  };

  const panicMode = () => {
    if (showDecrypted) {
      setDecryptedMessage("🚨 Mission aborted! Your secret has been obliterated into cosmic dust!");
      setShowDecrypted(false);
      setStoredPayload(null);
      setMessageConsumed(true);
      setAnimateClass("burning");
    }
  };

  const createNewMessage = () => {
    setMessage("");
    setPassphrase("");
    setInputPassphrase("");
    setEncryptedLink("");
    setCopySuccess(false);
    setStoredPayload(null);
    setDecryptedMessage("");
    setShowDecrypted(false);
    setIsReceiver(false);
    setMessageConsumed(false);
    setAnimateClass("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8DC] via-[#FFE4B5] to-[#FFDAB9] text-gray-800 p-6 font-['IBM_Plex_Mono']">
      <style>{`
        @keyframes burn {
          0% { opacity: 1; filter: brightness(1); }
          100% { opacity: 0; filter: brightness(0); }
        }
        .burning {
          animation: burn 2s forwards;
        }
        @keyframes spinner {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 24px;
          height: 24px;
          border: 4px solid rgba(0,0,0,0.1);
          border-left-color: #4E8B58;
          border-radius: 50%;
          animation: spinner 0.6s linear infinite;
        }
      `}</style>
      <Header />
      {processing && <ProcessingSpinner />}
      {isReceiver ? (
        <Receiver
          storedPayload={storedPayload}
          inputPassphrase={inputPassphrase}
          setInputPassphrase={setInputPassphrase}
          revealMessage={revealMessage}
          panicMode={panicMode}
          createNewMessage={createNewMessage}
          showDecrypted={showDecrypted}
          decryptedMessage={decryptedMessage}
          messageConsumed={messageConsumed}
          animateClass={animateClass}
        />
      ) : encryptedLink ? (
        <EncryptedLink
          encryptedLink={encryptedLink}
          copyToClipboard={copyToClipboard}
          copySuccess={copySuccess}
          createNewMessage={createNewMessage}
          messageConsumed={messageConsumed}
          animateClass={animateClass}
        />
      ) : (
        <SenderForm
          message={message}
          setMessage={setMessage}
          passphrase={passphrase}
          setPassphrase={setPassphrase}
          encryptMessage={encryptMessage}
        />
      )}
    </div>
  );
};

export default App;
