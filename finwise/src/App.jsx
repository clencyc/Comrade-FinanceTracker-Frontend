import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ExpenseForm from "./Pages/ExpenseForm";
import Footer from "./Components/Footer";
import Dashboard from "./Pages/Dashboard";
import Services from "./Pages/Services";
import Payments from "./Pages/Payments";
import Layout from "./Components/Layout";
import AIBooks from "./Pages/AIBooks";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT Sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/expense-form" element={<ExpenseForm />} />

        {/* Routes WITH Sidebar (Dashboard, Payments, Services) */}
        <Route path="/" element={<Layout />}>
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="payments" element={<Payments />} />
          <Route path="ai-books" element={<AIBooks /> } />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
