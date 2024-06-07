import { Navigate } from "react-router-dom";

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (admin?.user?.email === "retroagent@o2.pl") {
    return children;
  } else {
    return <Navigate to={"/adminlogin"} />;
  }
};
