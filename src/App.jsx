import { Route, Routes } from "react-router-dom";

import {
  FileTextSummarizer,
  Hero,
  ImageTextSummarizer,
  Summarizer,
  TextSummarizer,
  URLSummarizer,
} from "./components";

import "./App.css";
const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Routes>
          <Route path="/" element={<Summarizer />}>
            <Route path="/summarizer/url" element={<URLSummarizer />} />
            <Route path="/summarizer/text" element={<TextSummarizer />} />
            <Route path="/summarizer/image" element={<ImageTextSummarizer />} />
            <Route path="/summarizer/file" element={<FileTextSummarizer />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
};

export default App;
