import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

export default function MainContent({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
