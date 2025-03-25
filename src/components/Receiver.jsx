const Receiver = ({
    storedPayload,
    inputPassphrase,
    setInputPassphrase,
    revealMessage,
    panicMode,
    createNewMessage,
    showDecrypted,
    decryptedMessage,
    messageConsumed,
    animateClass,
  }) => (
    <div className="mt-10 p-8 bg-[#FAF3E0] rounded-xl shadow-lg border-4 border-[#6FAF75] max-w-xl w-full">
      {messageConsumed ? (
        <p className={`bg-[#FFF8DC] p-4 rounded-lg ${animateClass}`}>
          💥 Kaboom! Your secret has been vaporized into the digital abyss!
        </p>
      ) : !showDecrypted ? (
        <div>
          {storedPayload && storedPayload.encrypted && (
            <input
              type="password"
              placeholder="Enter passphrase"
              value={inputPassphrase}
              onChange={(e) => setInputPassphrase(e.target.value)}
              className="w-full p-2 mb-4 border-2 rounded-md"
            />
          )}
          <button
            onClick={revealMessage}
            disabled={storedPayload && storedPayload.encrypted && !inputPassphrase}
            className="w-full p-4 bg-[#FFA500] text-white font-semibold text-lg rounded-lg hover:bg-[#FF4500] transition-transform transform hover:scale-105 disabled:opacity-50"
          >
            👁️ Show Message
          </button>
          {storedPayload && showDecrypted && (
            <button
              onClick={panicMode}
              className="mt-4 w-full p-4 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-800 transition-transform transform hover:scale-105"
            >
              🚨 Panic Mode
            </button>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-4 font-semibold">📜 Decrypted Message:</p>
          <p className={`bg-[#FFF8DC] p-4 rounded-lg ${animateClass}`}>{decryptedMessage}</p>
        </div>
      )}
      <button
        onClick={createNewMessage}
        className="mt-6 w-full p-4 bg-[#4E8B58] text-white font-semibold text-lg rounded-lg hover:bg-[#2E6B38] transition-transform transform hover:scale-105"
      >
        ✍️ Create New Message
      </button>
    </div>
  );
  
  export default Receiver;
  