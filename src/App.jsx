import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddCourse from "./Pages/AddCourse";
import Courses from "./Pages/Courses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;