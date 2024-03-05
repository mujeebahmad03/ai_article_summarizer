import "./App.css";
import Hero from "./components/Hero";
import Summarizer from "./components/Summarizer";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero />
        <Summarizer />
      </div>
    </main>
  );
};

export default App;
