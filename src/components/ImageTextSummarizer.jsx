import { useEffect, useState } from "react";
import FileUploader from "./FileUploader";
import { useSummarizeTextMutation } from "../services/article";
import { createWorker } from "tesseract.js";
import ExtractedText from "./ExtractedText";
import { Button } from "@material-tailwind/react";
import Loader from "./Loader";
import Error from "./Error";
import Summary from "./Summary";
import Popup from "./Popup";

const ImageTextSummarizer = () => {
  const [textObj, setTextObj] = useState({ text: "", lang: "en" });
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [summary, setSummary] = useState("");
  const [allSummaries, setAllSummaries] = useState([]);
  const [copied, setCopied] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [summarizeText, { error, isLoading }] = useSummarizeTextMutation();

  useEffect(() => {
    const summariesFromLocalStorage = JSON.parse(
      localStorage.getItem("imageTextSummary")
    );

    if (summariesFromLocalStorage) {
      setAllSummaries(summariesFromLocalStorage);
      setSummary(summariesFromLocalStorage[0]);
    }
  }, []);

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
    ];
    if (!allowedTypes.includes(file.type)) {
      setLoading(false);
      // You can handle the error here, such as displaying a message to the user
      alert("Invalid image format");
      return;
    }

    // Create a Tesseract.js worker
    const worker = await createWorker("eng", 1, {
      logger: (m) => console.log(m), // Add logger here
    });

    try {
      // Extract text from the uploaded image
      const {
        data: { text },
      } = await worker.recognize(file);
      setTextObj((prev) => ({ ...prev, text: text }));
      setSummary("")
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Terminate the worker after processing
      await worker.terminate();
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await summarizeText(textObj);

    if (data?.summary) {
      const newSummary = data.summary;

      const updatedSummaries = [...allSummaries, newSummary];

      setSummary(newSummary);
      setAllSummaries(updatedSummaries);
      localStorage.setItem(
        "imageTextSummary",
        JSON.stringify(updatedSummaries)
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleCopy = (str) => {
    setCopied(str);
    navigator.clipboard.writeText(str);
    setTimeout(() => setCopied(false), 3000);
  };

  const onConfirm = () => {
    localStorage.removeItem("imageTextSummary");
    setAllSummaries([]);
    setTextObj({ text: "", lang: "en" });
  };

  return (
    <>
      <FileUploader
        handleDragEnter={handleDragEnter}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        dragging={dragging}
        loading={loading}
        handleFileUpload={handleFileUpload}
      />

      {textObj.text && (
        <>
          <ExtractedText text={textObj.text} />
          <Button
            size="sm"
            className="rounded-md mb-4"
            disabled={isLoading ? true : false}
            onClick={handleSubmit}
          >
            Summarize
          </Button>

          {/* Display Results */}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error error={error} />
          ) : (
            summary && (
              <Summary
                summary={summary}
                copied={copied}
                handleCopy={handleCopy}
              />
            )
          )}

          {allSummaries.length ? (
            <Button className="mt-4 mb-4" fullWidth onClick={() => setIsOpen(true)}>
              Clear History
            </Button>
          ) : (
            ""
          )}
          <Popup isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} />
        </>
      )}
    </>
  );
};

export default ImageTextSummarizer;
