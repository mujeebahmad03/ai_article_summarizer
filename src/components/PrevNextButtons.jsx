import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const PrevNextButtons = ({
  allSummaries,
  currentIndex,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex justify-between mt-4 mb-4">
      <Button color="blue" onClick={handlePrev} disabled={currentIndex <= 0}>
        Prev
      </Button>
      <Button
        color="amber"
        onClick={handleNext}
        disabled={currentIndex >= allSummaries.length - 1}
      >
        Next
      </Button>
    </div>
  );
};

PrevNextButtons.propTypes = {
  allSummaries: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default PrevNextButtons;
