import { useEffect, useState } from "react";
import { linkIcon } from "../assets";
import { useLazyGetURLSummaryQuery } from "../services/article";
import Loader from "./Loader";
import Error from "./Error";
import Summary from "./Summary";
import Popup from "./Popup";
import { Button } from "@material-tailwind/react";
import CopyButton from "./CopyButton";

const URLSummarizer = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [isOpen, setIsOpen] = useState(false);

  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetURLSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const onConfirm = () => {
    localStorage.removeItem("articles");
    setAllArticles([]);
    setArticle((prev) => ({ ...prev, url: "" }));
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            required
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↲
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <CopyButton
                copied={copied}
                item={item.url}
                handleCopy={handleCopy}
              />

              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>

        {allArticles.length ? (
          <Button onClick={() => setIsOpen(true)}>Clear History</Button>
        ) : (
          ""
        )}
      </div>
      <Popup isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} />

      {/* Display Results */}
      {isFetching ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        article.summary && (
          <Summary
            summary={article.summary}
            copied={copied}
            handleCopy={handleCopy}
          />
        )
      )}
    </section>
  );
};

export default URLSummarizer;
