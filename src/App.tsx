import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Secret from "./pages/Secret";
import GradTrip from "./pages/GradTrip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
        </Route>
        <Route path="/secret" element={<Secret />} />
        <Route path="/grad_trip" element={<GradTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
