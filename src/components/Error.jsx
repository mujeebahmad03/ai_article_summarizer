import PropTypes from "prop-types";

const Error = ({ error }) => {
  return (
    <p className="font-inter font-bold text-black text-center">
      Well, that wasn&apos;t suppose to happen...
      <br />
      <span className="font-satoshi font-normal text-grey-700">
        {error?.data?.error}
      </span>
    </p>
  );
};

Error.propTypes = {
  error: PropTypes.shape({
    data: PropTypes.shape({
      error: PropTypes.string,
    }),
  }),
};

export default Error;
