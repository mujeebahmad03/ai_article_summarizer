import pdfToText from "react-pdftotext";

async function extractTextFromPDF(file) {
  try {
    const text = await pdfToText(file);
    return text;
  } catch (error) {
    console.error("Failed to extract text from PDF:", error);
    return;
  }
}

export default extractTextFromPDF;
