import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Journey from "./pages/Journey";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;