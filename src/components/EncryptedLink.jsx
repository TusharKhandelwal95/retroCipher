import { QRCodeCanvas } from "qrcode.react";

const EncryptedLink = ({ encryptedLink, copyToClipboard, copySuccess, createNewMessage, messageConsumed, animateClass }) => (
  <div className="mt-10 p-6 bg-[#FFF8DC] rounded-lg shadow-lg border-4 border-[#6FAF75] max-w-xl w-full">
    <p className="mb-4 font-semibold">🔗 Share this link:</p>
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between bg-[#FAF3E0] p-3 rounded-lg w-full">
        <span className="truncate">{encryptedLink}</span>
        <button
          onClick={copyToClipboard}
          className="ml-4 p-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#FF4500] transition"
        >
          📋 Copy
        </button>
      </div>
      <div className="mt-4">
        <QRCodeCanvas value={encryptedLink} size={128} className={messageConsumed ? "burning" : ""} />
      </div>
    </div>
    {copySuccess && (
      <p className="text-green-600 mt-3 animate-bounce">✅ Link Copied Successfully!</p>
    )}
    <button
      onClick={createNewMessage}
      className="mt-6 w-full p-4 bg-[#4E8B58] text-white font-semibold text-lg rounded-lg hover:bg-[#2E6B38] transition-transform transform hover:scale-105"
    >
      ✍️ Create New Message
    </button>
  </div>
);

export default EncryptedLink;
