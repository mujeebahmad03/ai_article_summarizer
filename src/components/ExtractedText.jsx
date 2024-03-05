import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ExtractedText = ({ text }) => {
  return (
    <section className="mt-5 mb-5 w-full max-w-xl">
      <div className="relative">
        <Typography variant="h4">Extracted Text:</Typography>
        <Typography className="font-satoshi font-medium max-h-40 overflow-y-auto p-4" variant="paragraph">
          {text}
        </Typography>
      </div>
    </section>
  );
};

ExtractedText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ExtractedText;
