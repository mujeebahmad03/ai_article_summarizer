import { useState } from "react";

const useHandleCopy = (timeoutDuration = 3000) => {
  const [copied, setCopied] = useState("");

  const handleCopy = async (str) => {
    try {
      await navigator.clipboard.writeText(str);
      setCopied(str);
      setTimeout(() => setCopied(false), timeoutDuration);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return {
    copied,
    handleCopy,
  };
};

export default useHandleCopy;
