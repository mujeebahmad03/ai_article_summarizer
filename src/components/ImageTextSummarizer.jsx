import TextExtractor from "./TextExtractor";


const ImageTextSummarizer = () => {
  return (
    <TextExtractor
      localStorageKey="imageTextSummary"
      title="Upload your image"
      fileTypes=".jpg, .png, .webp, .pbm, .bmp"
    />
  );
};

export default ImageTextSummarizer;
