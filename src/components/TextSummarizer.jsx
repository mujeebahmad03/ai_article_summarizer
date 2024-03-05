import { Textarea, Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSummarizeTextMutation } from "../services/article";
import Summary from "./Summary";
import Loader from "./Loader";
import Error from "./Error";
import Popup from "./Popup";
import SupportedLanguages from "./SupportedLanguages";

const TextSummarizer = () => {
  const [summarizeText, { error, isLoading }] = useSummarizeTextMutation();

  const [textObj, setTextObj] = useState({ text: "", lang: "en" });
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState("");
  const [allSummaries, setAllSummaries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const summariesFromLocalStorage = JSON.parse(
      localStorage.getItem("textSummary")
    );

    if (summariesFromLocalStorage) {
      setAllSummaries(summariesFromLocalStorage);
      setSummary(summariesFromLocalStorage[0]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await summarizeText(textObj);

    if (data?.summary) {
      const newSummary = data.summary;

      const updatedSummaries = [...allSummaries, newSummary];

      setSummary(newSummary);
      setAllSummaries(updatedSummaries);
      localStorage.setItem("textSummary", JSON.stringify(updatedSummaries));
    }
  };

  const handleCopy = (str) => {
    setCopied(str);
    navigator.clipboard.writeText(str);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleNext = () => {
    if (currentIndex < allSummaries.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSummary(allSummaries[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSummary(allSummaries[currentIndex - 1]);
    }
  };

  const onConfirm = () => {
    localStorage.removeItem("textSummary");
    setAllSummaries([]);
    setTextObj({ url: "", lang: "en" });
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="relative">
        <Textarea
          label="Enter your text here"
          rows={8}
          name="text"
          value={textObj.text}
          onChange={(e) => setTextObj({ ...textObj, text: e.target.value })}
        />
        <div className="flex w-full justify-between py-1.5 flex-wrap gap-4">
          <SupportedLanguages
            onChange={(value) => setTextObj({ ...textObj, lang: value })}
            value={textObj.lang}
            name="lang"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              color="red"
              variant="text"
              className="rounded-md"
              onClick={() => setTextObj((prev) => ({ ...prev, text: "" }))}
              disabled={isLoading ? true : false || textObj.text ? false : true}
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="rounded-md"
              disabled={isLoading ? true : false || textObj.text ? false : true}
              onClick={handleSubmit}
            >
              Summarize
            </Button>
          </div>
        </div>
      </div>

      {/* Display Results */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        summary && (
          <Summary summary={summary} copied={copied} handleCopy={handleCopy} />
        )
      )}

      <div className="flex justify-between mt-4 mb-4">
        <Button color="blue" onClick={handlePrev} disabled={currentIndex <= 0}>
          Prev
        </Button>
        <Button
          color="amber"
          onClick={handleNext}
          disabled={currentIndex >= allSummaries.length - 1}
        >
          Next
        </Button>
      </div>

      {allSummaries.length ? (
        <Button className="mt-4 mb-4" fullWidth onClick={() => setIsOpen(true)}>
          Clear History
        </Button>
      ) : (
        ""
      )}
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} />
    </section>
  );
};

export default TextSummarizer;
