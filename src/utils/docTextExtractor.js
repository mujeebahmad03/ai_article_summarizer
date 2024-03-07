import mammoth from "mammoth";

/**
 * Extract text from a DOC file.
 * @param {File} file - The DOC file to extract text from.
 * @returns {Promise<string>} A promise that resolves to the extracted text.
 */
async function extractTextFromDOC(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // Read the file as an ArrayBuffer so that it can be passed to Mammoth
    reader.readAsArrayBuffer(file);
    // When the file has been read, extract the text from it
    // using Mammoth.
    //
    // The `readAsArrayBuffer` method of the `FileReader` class returns
    // the contents of the file as an `ArrayBuffer`. This is necessary
    // because Mammoth expects an `ArrayBuffer` as input.
    //
    // Once the text has been extracted, resolve the promise with the
    // extracted text. If there is an error, reject the promise with an
    // error message.
    reader.onload = () => {
      mammoth
        .extractRawText({
          // The DOC file is read as an `ArrayBuffer` and passed to
          // Mammoth.
          arrayBuffer: new Uint8Array(reader.result),
        })
        .then((result) => {
          // Resolve the promise with the extracted text.
          resolve(result.value);
        })
        .catch((error) => {
          // Log the error and reject the promise with an error
          // message.
          console.error("Error extracting text from DOC:", error);
          reject(error);
        });
    };
  });
}

export default extractTextFromDOC;