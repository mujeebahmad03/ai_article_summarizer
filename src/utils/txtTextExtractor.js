/**
 * Extract text from a txt file.
 *
 * @param {File} file The txt file to extract text from.
 * @returns {Promise<string>} The extracted text from the file.
 */
async function extractTextFromTxt(file) {
  // Read first 10 MB of the file only.
  const blob = file.slice(0, 10000000);

  // Read the text from the file.
  const text = await blob.text();

  return text;
}


export default extractTextFromTxt;
