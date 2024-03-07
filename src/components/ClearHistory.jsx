import { Button } from "@material-tailwind/react";
import Popup from "./Popup";
import PropTypes from "prop-types";

const ClearHistory = ({ isOpen, setIsOpen, onConfirm }) => {
  return (
    <>
      <Button className="mt-4 mb-4" fullWidth onClick={() => setIsOpen(true)}>
        Clear History
      </Button>

      <Popup isOpen={isOpen} setIsOpen={setIsOpen} onConfirm={onConfirm} />
    </>
  );
};

ClearHistory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ClearHistory;
