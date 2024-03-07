async function extractTextFromTxt(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const text = reader.result;
      resolve(text);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export default extractTextFromTxt;
