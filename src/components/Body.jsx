import { memo } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="Body">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default memo(Body);
