import { Button, Tooltip } from "@material-tailwind/react";
import { copy, tick } from "../assets";
import PropTypes from "prop-types";

const CopyButton = ({ copied, item, handleCopy }) => {
  return (
    <Tooltip
      content={copied === item ? "Copied" : "Copy"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <Button className="copy_btn p-0" onClick={() => handleCopy(item)}>
        <img
          src={copied === item ? tick : copy}
          alt="copy_icon"
          className="w-[40%] h-[40%] object-contain"
        />
      </Button>
    </Tooltip>
  );
};

CopyButton.propTypes = {
  copied: PropTypes.any,
  item: PropTypes.any,
  handleCopy: PropTypes.func,
};

export default CopyButton;
