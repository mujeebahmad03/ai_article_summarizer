import { Button } from "@material-tailwind/react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TextSummarizer from "./TextSummarizer";
import ImageTextSummarizer from "./ImageTextSummarizer";
import URLSummarizer from "./URLSummarizer";
import FileTextSummarizer from "./FileTextSummarizer";

const Summarizer = () => {
  return (
    <Router>
      <div className=" mt-16 w-full max-w-[32rem] flex flex-col gap-4">
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="/summarizer/url">
            URL
          </Link>
        </Button>
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="/summarizer/text">
            Text
          </Link>
        </Button>
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="/summarizer/image">
            Image
          </Link>
        </Button>
        <Button fullWidth size="lg" variant="outlined">
          <Link className="block w-full" to="/summarizer/file">
            File
          </Link>
        </Button>
      </div>

      <Routes>
        <Route path="/summarizer/url" element={<URLSummarizer />} />
        <Route path="/summarizer/text" element={<TextSummarizer />} />
        <Route path="/summarizer/image" element={<ImageTextSummarizer />} />
        <Route path="/summarizer/file" element={<FileTextSummarizer />} />
      </Routes>
    </Router>
  );
};

export default Summarizer;
