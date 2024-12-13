import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Input from "./pages/Input";
import Charts from "./pages/Charts";
import Field  from "./pages/Field";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Input/>} />
        <Route path="/fields" element={<Field />}/>
        <Route path="/visualize" element={<Charts />} />
      </Routes>
    </Router>
  );
}

export default App;
