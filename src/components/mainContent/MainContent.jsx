import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./MainContent.css";

export default function MainContent({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content screen-h">{children}</div>
      <Footer />
    </div>
  );
}
