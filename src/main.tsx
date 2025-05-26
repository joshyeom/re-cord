import "./app/index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { AnalyzingPage } from "./pages/AnalyzingPage";
import { MainPage } from "./pages/MainPage";
import { ResultPage } from "./pages/ResultPage";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/analyzing" element={<AnalyzingPage />} />
      <Route path="/analyze-result" element={<ResultPage />} />
    </Routes>
  </BrowserRouter>
);
