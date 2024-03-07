import pdfToText from "react-pdftotext";

/**
 * Extract text from a PDF file.
 *
 * @param {File} file - The PDF file to extract text from.
 * @returns {Promise<string>} A promise that resolves to the extracted text.
 */
async function extractTextFromPDF(file) {
  try {
    const text = await pdfToText(file);
    return text;
  } catch (error) {
    console.error("Failed to extract text from PDF:", error);
    // Return nothing if there was an error extracting the text
    return "";
  }
}

export default extractTextFromPDF;
