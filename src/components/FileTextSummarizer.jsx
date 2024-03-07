import TextExtractor from "./TextExtractor";

const FileTextSummarizer = () => {
  return (
    <TextExtractor
      localStorageKey="fileTextSummary"
      title="Upload your file"
      fileTypes=".pdf, .doc, .ppt, .txt, .md, .html"
    />
  );
};

export default FileTextSummarizer;
