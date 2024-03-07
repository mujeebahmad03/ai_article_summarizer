import { createWorker } from "tesseract.js";

async function extractTextFromImage(file) {
  // Create a Tesseract.js worker
  const worker = await createWorker("eng", 1, {
    logger: (m) => console.log(m), // Add logger here
  });

  try {
    // Extract text from the uploaded image
    const {data: { text }} = await worker.recognize(file);
    return text
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Terminate the worker after processing
    await worker.terminate();
  }
}

export default extractTextFromImage;
