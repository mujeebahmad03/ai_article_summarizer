import { useState } from "react";
import FileUploader from "./FileUploader";
import { useSummarizeTextMutation } from "../services/article";
import { createWorker } from "tesseract.js";
import ExtractedText from "./ExtractedText";
import { Button } from "@material-tailwind/react";
import useSummarizer from "../hooks/useSummarizer";
import SummaryContainer from "./SummaryContainer";
import useHandleDrag from "../hooks/useHandleDrag";
import ClearHistory from "./ClearHistory";
import PrevNextButtons from "./PrevNextButtons";

const ImageTextSummarizer = () => {
  const [loading, setLoading] = useState(false);

  const [summarizeText, { error, isLoading }] = useSummarizeTextMutation();

  const {
    summary,
    allSummaries,
    copied,
    currentIndex,
    isOpen,
    dataObj,
    handleSubmit,
    handleCopy,
    handleNext,
    handlePrev,
    onConfirm,
    setDataObj,
    setIsOpen,
    setSummary,
  } = useSummarizer({ text: "", lang: "en" }, "textSummary", summarizeText);

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
      setDataObj((prev) => ({ ...prev, text: text }));
      setSummary("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Terminate the worker after processing
      await worker.terminate();
      setLoading(false);
    }
  };

  const {
    dragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useHandleDrag(handleFileUpload);

  return (
    <section className="mt-16 w-full max-w-xl">
      <FileUploader
        handleDragEnter={handleDragEnter}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        dragging={dragging}
        loading={loading}
        handleFileUpload={handleFileUpload}
      />

      {dataObj.text && (
        <>
          <ExtractedText text={dataObj.text} />
          <Button
            size="sm"
            className="rounded-md mb-4"
            disabled={isLoading ? true : false}
            onClick={handleSubmit}
          >
            Summarize
          </Button>
        </>
      )}

      {/* Display Results */}
      {summary && (
        <SummaryContainer
          summary={summary}
          isLoading={isLoading}
          error={error}
          copied={copied}
          handleCopy={handleCopy}
        />
      )}

      <PrevNextButtons
        allSummaries={allSummaries}
        currentIndex={currentIndex}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />

      {allSummaries.length > 0 && (
        <ClearHistory
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={onConfirm}
        />
      )}
    </section>
  );
};

export default ImageTextSummarizer;
