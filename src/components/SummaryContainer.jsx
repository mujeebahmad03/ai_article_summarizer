import Loader from "./Loader";
import Error from "./Error";
import Summary from "./Summary";
import PropTypes from "prop-types";

const SummaryContainer = ({
  summary,
  error,
  isLoading,
  copied,
  handleCopy,
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        summary && (
          <Summary summary={summary} copied={copied} handleCopy={handleCopy} />
        )
      )}
    </>
  );
};

SummaryContainer.propTypes = {
  summary: PropTypes.string.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  copied: PropTypes.string,
  handleCopy: PropTypes.func,
};

export default SummaryContainer;
