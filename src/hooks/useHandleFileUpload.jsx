import { useState } from "react";
import extractTextFromImage from "../utils/imageTextExtractor";
import extractTextFromPDF from "../utils/pdfTextExtractor";
import extractTextFromDOC from "../utils/docTextExtractor";
import extractTextFromTxt from "../utils/txtTextExtractor";
import { useTextExtractMutation } from "../services/textExtractor";

const useHandleFileUpload = (setDataObj, setSummary) => {
  const [loading, setLoading] = useState(false);

  const [textExtract] = useTextExtractMutation();

  const extractText = async (file) => {
    try {
      const { data } = await textExtract(file);
      return data?.text || null;
    } catch (error) {
      console.error("Error occurred while extracting text:", error);
      return null;
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);

    // Check if a file is selected
    if (!file) {
      setLoading(false);
      return;
    }

    // Check if the file type is allowed
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/x-portable-bitmap",
      "image/bmp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "text/markdown", // for .md files
      "text/html", // for .html files
    ];
    

    let text;

    if (allowedTypes.includes(file.type)) {
      // Handling different file types
      switch (file.type) {
        case "image/jpeg":
        case "image/png":
        case "image/webp":
        case "image/x-portable-bitmap":
        case "image/bmp":
          text = await extractTextFromImage(file);
          break;
        case "application/pdf":
          text = await extractTextFromPDF(file);
          break;
        case "application/msword":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          text = await extractTextFromDOC(file);
          break;
        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        case "text/markdown":
        case "text/html":
          text = await extractText(file);
          break;
        case "text/plain":
          text = await extractTextFromTxt(file);
          break;
        default:
          break;
      }
    } else {
      setLoading(false);
      // You can handle the error here, such as displaying a message to the user
      alert("Unsupported file format");
    }

    setDataObj((prev) => ({ ...prev, text: text }));
    setSummary("");
    setLoading(false);
  };

  return {
    loading,
    handleFileUpload,
  };
};

export default useHandleFileUpload;
