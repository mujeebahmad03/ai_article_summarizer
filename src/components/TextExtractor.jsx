import { Button } from "@material-tailwind/react";
import useHandleDrag from "../hooks/useHandleDrag";
import useHandleFileUpload from "../hooks/useHandleFileUpload";
import useSummarizer from "../hooks/useSummarizer";
import { useSummarizeTextMutation } from "../services/article";
import ExtractedText from "./ExtractedText";
import FileUploader from "./FileUploader";
import SummaryContainer from "./SummaryContainer";
import PrevNextButtons from "./PrevNextButtons";
import ClearHistory from "./ClearHistory";
import PropTypes from "prop-types";

const TextExtractor = ({ localStorageKey, title, fileTypes }) => {
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
  } = useSummarizer({ text: "", lang: "en" }, localStorageKey, summarizeText);

  const { loading, handleFileUpload } = useHandleFileUpload(
    setDataObj,
    setSummary
  );

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
        title={title}
        fileTypes={fileTypes}
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

TextExtractor.propTypes = {
  localStorageKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fileTypes: PropTypes.string.isRequired,
};
export default TextExtractor;
