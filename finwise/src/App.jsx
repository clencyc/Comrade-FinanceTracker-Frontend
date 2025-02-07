import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ExpenseForm from "./Pages/ExpenseForm";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expense-form" element={<ExpenseForm/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
