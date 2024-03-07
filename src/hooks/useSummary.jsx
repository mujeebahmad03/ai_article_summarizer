import { useState, useEffect } from "react";
import { useLazyGetURLSummaryQuery } from "../services/article";
import useHandleCopy from "./useHandleCopy";

const useSummary = () => {
  const { copied, handleCopy } = useHandleCopy();

  const [article, setArticle] = useState({ url: "", summary: "" });
  const [isOpen, setIsOpen] = useState(false);

  const [allSummaries, setAllSummaries] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetURLSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("urlSummary")
    );

    if (articlesFromLocalStorage) {
      setAllSummaries(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newSummary = { ...article, summary: data.summary };

      const updatedAllSummaries = [...allSummaries, newSummary];

      setArticle(newSummary);
      setAllSummaries(updatedAllSummaries);

      localStorage.setItem("urlSummary", JSON.stringify(updatedAllSummaries));
    }
  };

  const onConfirm = () => {
    localStorage.removeItem("urlSummary");
    setAllSummaries([]);
    setArticle({ url: "", summary: "" });
  };

  return {
    allSummaries,
    article,
    copied,
    error,
    isOpen,
    isFetching,
    setArticle,
    setIsOpen,
    handleCopy,
    handleSubmit,
    onConfirm,
  };
};

export default useSummary;
