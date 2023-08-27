import Auth from "../pages/Auth/Auth";
import Main from "../pages/Main/Main";
import Basket from "../pages/Basket/Basket";
import Admin from "../pages/Admin/Admin";
import DevicePage from "../pages/DevicePage/DevicePage";
import Logout from "../pages/Logout/Logout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

export const authRoutes = [
    {path: "/basket", element: <Basket />},
    {path: "/admin", element: <Admin />},
    {path: "/logout", element: <Logout />},
]

export const publicRoutes = [
    {path: "/login", element: <Login />},
    {path: "/registration", element: <Register />},
    {path: "/forgot-password", element: <ForgotPassword />},
    {path: "/reset-password", element: <ResetPassword />},
    {path: "/", element: <Main />},
    {path: "/device/:id", element: <DevicePage />}
]