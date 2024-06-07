import { useContext } from "react";
import MainContent from "../../components/mainContent/MainContent";
import Context from "../../context/Context";

import "./Nopage.css";

export default function NoPage() {
  const context = useContext(Context);
  const { mode } = context;
  return (
    <MainContent>
      <div className="pageNotFound">
        <h1
          className="font-bold text-2xl mb-2"
          style={{ color: mode === "dark" ? "white" : "black" }}
        >
          ERROR 404
        </h1>
        <h1
          className="font-bold text-2xl mb-2"
          style={{ color: mode === "dark" ? "white" : "black" }}
        >
          Page Not Found
        </h1>
      </div>
    </MainContent>
  );
}
