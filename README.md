# RetroCipher

RetroCipher is a secure and ephemeral message-sharing application built with React and Tailwind CSS. It allows users to encrypt secret messages and share them via a link (and accompanying QR code) without requiring a backend database. The message can only be decrypted once before it self-destructs.

**Live Preview:** [RetroCipher](https://retro-cipher.vercel.app/)

## Features

- **One-Time View:** The secret message self-destructs after being viewed.
- **Optional Passphrase:** Increase security by encrypting messages with a passphrase.
- **QR Code Generation:** Automatically generates a QR code for the encrypted link.
- **Animated Processing:** Simulated delays with a spinner and dynamic burning animation when the message self-destructs.
- **Modular Architecture:** Code is organized into reusable components and utility functions.

## Project Structure

```retro-cipher/
├── index.html
├── src/
│   ├── App.jsx                # Main application file that ties everything together
│   ├── main.jsx 
│   ├── index.css              # Styling 
│   ├── components/
│   │   ├── Header.jsx         # Displays the app title and tagline
│   │   ├── ProcessingSpinner.jsx  # Spinner component displayed during processing
│   │   ├── SenderForm.jsx     # Form for composing and encrypting secret messages
│   │   ├── EncryptedLink.jsx  # Displays the generated encrypted link and QR code
│   │   └── Receiver.jsx       # Component for decrypting and displaying messages
│   └── utils/
│       └── cryptoUtils.js     # Utility functions for encryption, decryption, and link generation
├── package.json
└── README.md
```

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/TusharKhandelwal95/retroCipher.git
   cd retro-cipher

2. **Install dependencies:**

   ```bash
   npm install

3. **Run the development Server:**

   ```bash
   npm run dev

## Usage
- **Encrypt a Message:**
Enter your secret message and, optionally, a passphrase. Click "Encrypt Message" to generate a shareable link and QR code.

- **Share the Link:**
Copy the generated link or share the QR code with your intended recipient.

- **Decrypt a Message:**
When the recipient opens the link, they can enter the passphrase (if one was used) and click "Show Message". The message will be displayed for 20 seconds before self-destructing with a burning animation.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your improvements.

