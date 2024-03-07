import { linkIcon } from "../assets";
import CopyButton from "./CopyButton";
import SummaryContainer from "./SummaryContainer";
import useSummary from "../hooks/useSummary";
import ClearHistory from "./ClearHistory";

const URLSummarizer = () => {
  const {
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
  } = useSummary();

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
          {allSummaries.map((item, index) => (
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
      </div>

      {allSummaries.length && (
        <ClearHistory
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onConfirm={onConfirm}
        />
      )}

      {article.summary && (
        <SummaryContainer
          summary={article.summary}
          isLoading={isFetching}
          error={error}
          copied={copied}
          handleCopy={handleCopy}
        />
      )}
    </section>
  );
};

export default URLSummarizer;
