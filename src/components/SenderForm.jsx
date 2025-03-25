const SenderForm = ({ message, setMessage, passphrase, setPassphrase, encryptMessage }) => (
    <div className="bg-[#FAF3E0] p-8 rounded-xl shadow-2xl max-w-xl w-full border-4 border-[#FFD700]">
      <label className="block text-lg font-semibold mb-4">📄 Your Secret Message:</label>
      <textarea
        className="w-full p-4 rounded-md bg-[#FFFACD] text-gray-800 outline-none border-2 border-gray-600"
        placeholder="Type your secret message here..."
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="password"
        placeholder="Optional: Enter a passphrase"
        value={passphrase}
        onChange={(e) => setPassphrase(e.target.value)}
        className="w-full p-2 mt-4 mb-6 border-2 rounded-md"
      />
      <button
        onClick={encryptMessage}
        className="w-full p-4 bg-[#6FAF75] text-white font-semibold text-lg rounded-lg hover:bg-[#4E8B58] transition-transform transform hover:scale-105"
      >
        🔐 Encrypt Message
      </button>
    </div>
  );
  
  export default SenderForm;
  