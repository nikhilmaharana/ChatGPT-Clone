import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

import {
  useAuth,
} from "../context/AuthContext";

function AppRoutes() {

  const { token } = useAuth();

  return (
    <BrowserRouter>

      <Routes>

        {/* Public Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Signup />
            )
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;