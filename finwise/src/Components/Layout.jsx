import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar"; // Include Navbar here

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Outlet /> {/* This renders Dashboard, Services, or Payments */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
