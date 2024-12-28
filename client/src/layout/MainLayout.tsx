import Navbar from "@/components/Navabar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
const MainLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {/* main content */}
      <div>
        <Outlet />
      </div>
      {/* footer */}
      <Footer />{" "}
    </div>
  );
};

export default MainLayout;
