import mammoth from "mammoth";

async function extractTextFromDOC(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      mammoth
        .extractRawText({ arrayBuffer: new Uint8Array(reader.result) })
        .then((result) => resolve(result.value))
        .catch((error) => {
          console.error("Error extracting text from DOC:", error);
          reject(error);
        });
    };
  });
}

export default extractTextFromDOC;