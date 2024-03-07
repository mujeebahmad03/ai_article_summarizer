import { useEffect, useState } from "react";
import useHandleCopy from "./useHandleCopy";

const useSummarizer = (initialState, localStorageKey, summarizeFunction) => {
  const { copied, handleCopy } = useHandleCopy();

  const [dataObj, setDataObj] = useState(initialState);
  const [summary, setSummary] = useState("");

  const [allSummaries, setAllSummaries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const summariesFromLocalStorage = JSON.parse(
      localStorage.getItem(localStorageKey)
    );

    if (summariesFromLocalStorage) {
      setSummary(summariesFromLocalStorage[0]);
      setAllSummaries(summariesFromLocalStorage);
    }
  }, [localStorageKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await summarizeFunction(dataObj);

    if (data?.summary) {
      const newSummary = data.summary;

      const updatedSummaries = [...allSummaries, newSummary];

      setSummary(newSummary);
      setAllSummaries(updatedSummaries);
      localStorage.setItem(localStorageKey, JSON.stringify(updatedSummaries));
    }
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
    localStorage.removeItem(localStorageKey);
    setAllSummaries([]);
    setDataObj(initialState);
    setSummary("");
  };

  return {
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
    setSummary,
  };
};

export default useSummarizer;
