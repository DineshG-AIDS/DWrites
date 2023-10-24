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
import PrivateRoutes from "./Routes/PrivateRoutes";
import SinglePostScreen from "./Screens/SinglePostScreen";
import EditScreen from "./Screens/EditScreen";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<HomeScreens />} />
        <Route path="/login" element={<LOginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route element={<PrivateRoutes />}>
          {" "}
          {/* <Route path="/aboutus" element={<AboutUsScreen />} /> */}
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/edit/:id" element={<EditScreen />} />
        </Route>
        <Route path="/trend" element={<TrendingScreen />} />
        <Route path="/blog" element={<BlogScreen />} />
        <Route path="/aboutus" element={<AboutUsScreen />} />
        <Route path="/post/:id" element={<SinglePostScreen />} />

        {/* /////////////////////////////////////////////// */}
        <Route path="*" element={<NotFoundScreen />} />

        {/* ///////////////////////////////////////////////////////////// */}
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
