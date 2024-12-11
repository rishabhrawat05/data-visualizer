import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Charts from "./pages/Charts";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    setFormData(data); 
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Input onVisualize= {handleFormSubmit}/>} />
        <Route path="/visualize" element={<Charts data = {formData} />} />
      </Routes>
    </Router>
  );
}

export default App;
