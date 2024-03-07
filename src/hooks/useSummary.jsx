import { useState, useEffect } from "react";
import { useLazyGetURLSummaryQuery } from "../services/article";
import useHandleCopy from "./useHandleCopy";

const useSummary = () => {
  const { copied, handleCopy } = useHandleCopy();

  const [article, setArticle] = useState(
    JSON.parse(localStorage.getItem("article")) || { url: "", summary: "" }
  );
  const [isOpen, setIsOpen] = useState(false);

  const [allSummaries, setAllSummaries] = useState(
    JSON.parse(localStorage.getItem("urlSummary")) || []
  );

  const [getSummary, { error, isFetching }] = useLazyGetURLSummaryQuery();

  useEffect(() => {
    localStorage.setItem("article", JSON.stringify(article));
    localStorage.setItem("urlSummary", JSON.stringify(allSummaries));
  }, [article, allSummaries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newSummary = { ...article, summary: data.summary };

      setArticle(newSummary);
      setAllSummaries([...allSummaries, newSummary]);
    }
  };

  const onConfirm = () => {
    localStorage.removeItem("urlSummary");
    localStorage.removeItem("article");
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
