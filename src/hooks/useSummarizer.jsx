import { useEffect, useState } from "react";
import useHandleCopy from "./useHandleCopy";

const useSummarizer = (initialState, localStorageKey, summarizeFunction) => {
  const [dataObj, setDataObj] = useState(initialState);
  const [summary, setSummary] = useState("");
  const [allSummaries, setAllSummaries] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || []
  );
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const { copied, handleCopy } = useHandleCopy();

  useEffect(() => {
    if (allSummaries.length) {
      setSummary(allSummaries[0]);
      setCurrentIndex(0);
    }
  }, [allSummaries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await summarizeFunction(dataObj);

    if (data?.summary) {
      setSummary(data.summary);
      setAllSummaries((prevSummaries) => [...prevSummaries, data.summary]);
      localStorage.setItem(
        localStorageKey,
        JSON.stringify([...allSummaries, data.summary])
      );
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allSummaries.length);
    setSummary(allSummaries[(currentIndex + 1) % allSummaries.length]);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allSummaries.length) % allSummaries.length
    );
    setSummary(
      allSummaries[
        (currentIndex - 1 + allSummaries.length) % allSummaries.length
      ]
    );
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
