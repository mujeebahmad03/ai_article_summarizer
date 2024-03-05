import PropTypes from "prop-types";
import CopyButton from "./CopyButton";

const Summary = ({ summary, copied, handleCopy }) => {
  return (
    <div className="my-10 max-w-full flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Article <span className="blue_gradient">Summary</span>
          </h2>
          <CopyButton copied={copied} handleCopy={handleCopy} item={summary} />
        </div>

        <div className="summary_box">
          <p className="font-inter font-medium text-sm text-gray-700">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
};

Summary.propTypes = {
  summary: PropTypes.string,
  copied: PropTypes.string,
  handleCopy: PropTypes.func,
};
export default Summary;
