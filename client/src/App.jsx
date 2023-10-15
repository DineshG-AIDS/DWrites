import HomeScreens from "./Screens/HomeScreens";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LOginScreen from "./Screens/LOginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import TrendingScreen from "./Screens/TrendingScreen";
import BlogScreen from "./Screens/BlogScreen";
import AboutUsScreen from "./Screens/AboutUsScreen";
import NotFoundScreen from "./Screens/NotFoundScreen";
import CreateScreen from "./Screens/CreateScreen";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect(() => {
  //   let token = Cookies.get("token");
  //   setIsLoggedIn(!!token);
  // }, []);
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<HomeScreens />} />
        <Route path="/login" element={<LOginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/trend" element={<TrendingScreen />} />
        <Route path="/blog" element={<BlogScreen />} />

        <Route path="/aboutus" element={<AboutUsScreen />} />
        <Route path="/create" element={<CreateScreen />} />

        {/* /////////////////////////////////////////////// */}
        <Route path="*" element={<NotFoundScreen />} />

        {/* ///////////////////////////////////////////////////////////// */}

        {/* <Route element={<PrivateRoutes />}></Route>
        <Route path="/test" element={<TestScreen />} />

        <Route path="/register" element={<RegisterScreen />} />
        
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/create" element={<CreateBlogScreen />} />

        <Route path="/blog" element={<BlogScreen />} /> */}
      </Route>
    )
  );
  return (
    <RouterProvider router={Router}>
      <Outlet />
    </RouterProvider>
  );
}

export default App;
