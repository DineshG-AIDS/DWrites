import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    const userDataCookie = Cookies.get("token");
    setIsLoggedIn(userDataCookie);
    console.log(!!userDataCookie);
  }, []);
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default PrivateRoutes;
