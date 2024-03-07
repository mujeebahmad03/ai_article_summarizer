import { Textarea, Button } from "@material-tailwind/react";
import { useSummarizeTextMutation } from "../services/article";
import SupportedLanguages from "./SupportedLanguages";
import useSummarizer from "../hooks/useSummarizer";
import SummaryContainer from "./SummaryContainer";
import ClearHistory from "./ClearHistory";
import PrevNextButtons from "./PrevNextButtons";

const TextSummarizer = () => {
  const [summarizeText, { error, isLoading }] = useSummarizeTextMutation();

  const {
    summary,
    allSummaries,
    copied,
    isOpen,
    dataObj,
    currentIndex,
    handleSubmit,
    handleCopy,
    handleNext,
    handlePrev,
    onConfirm,
    setDataObj,
    setIsOpen,
  } = useSummarizer({ text: "", lang: "en" }, "textSummary", summarizeText);

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="relative">
        <Textarea
          label="Enter your text here"
          rows={8}
          name="text"
          value={dataObj.text}
          onChange={(e) => setDataObj({ ...dataObj, text: e.target.value })}
        />
        <div className="flex w-full justify-between py-1.5 flex-wrap gap-4">
          <SupportedLanguages
            onChange={(value) => setDataObj({ ...dataObj, lang: value })}
            value={dataObj.lang}
            name="lang"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              color="red"
              variant="text"
              className="rounded-md"
              onClick={() => setDataObj((prev) => ({ ...prev, text: "" }))}
              disabled={isLoading ? true : false || dataObj.text ? false : true}
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="rounded-md"
              disabled={isLoading ? true : false || dataObj.text ? false : true}
              onClick={handleSubmit}
            >
              Summarize
            </Button>
          </div>
        </div>
      </div>

      {/* Display Results */}
      <SummaryContainer
        summary={summary}
        isLoading={isLoading}
        error={error}
        copied={copied}
        handleCopy={handleCopy}
      />

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

export default TextSummarizer;
