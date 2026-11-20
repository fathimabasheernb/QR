import { useState } from "react";
import QRCode from "qrcode";

function QRCodeGenerator() {

  const [text, setText] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [size, setSize] = useState(256);
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const generateQR = async () => {

    if (!text.trim()) {
      alert("Please enter text or URL");
      return;
    }

    try {
      const image = await QRCode.toDataURL(text, {
        width: Number(size),
        margin: 2,
        color: {
          dark: foreground,
          light: background
        }
      });

      setQrImage(image);

    } catch (error) {
      console.error(error);
      alert("QR generation failed");
    }
  };

  const downloadQR = () => {

    if (!qrImage) return;

    const link = document.createElement("a");

    link.href = qrImage;
    link.download = "my-qrcode.png";

    link.click();
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          QR Code Generator
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Generate and customize your QR codes
        </p>

        {/* Text Input */}

        <label className="font-semibold">
          Enter Text or URL
        </label>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text or website URL..."
          className="w-full border rounded-lg p-3 mt-2 mb-5"
          rows="3"
        />

        {/* QR Size */}

        <label className="font-semibold">
          QR Code Size
        </label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2 mb-5"
        >
          <option value="128">128 px</option>
          <option value="256">256 px</option>
          <option value="512">512 px</option>
          <option value="1024">1024 px</option>
        </select>

        {/* Colours */}

        <div className="grid grid-cols-2 gap-5 mb-6">

          <div>
            <label className="font-semibold">
              QR Colour
            </label>

            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="w-full h-12 cursor-pointer"
            />
          </div>

          <div>
            <label className="font-semibold">
              Background Colour
            </label>

            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full h-12 cursor-pointer"
            />
          </div>

        </div>

        {/* Generate Button */}

        <button
          onClick={generateQR}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Generate QR Code
        </button>

        {/* QR Preview */}

        {qrImage && (

          <div className="mt-8 text-center">

            <h2 className="font-semibold text-xl mb-4">
              Your QR Code
            </h2>

            <div className="flex justify-center mb-5">
              <img
                src={qrImage}
                alt="Generated QR Code"
                className="border p-2 rounded-lg max-w-full h-auto"
              />
            </div>

            <button
              onClick={downloadQR}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Download QR Code
            </button>

          </div>

        )}

      </div>

    </div>

  );
}

export default QRCodeGenerator;
