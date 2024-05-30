import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Basket from "../pages/Basket/Basket";
import Login from "../pages/Login/Login";
import Ticketing from "../pages/Ticketing/Ticketing";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ToS from "../pages/ToS/ToS";
import Privacy from "../pages/Privacy/Privacy";
import Contact from "../pages/Contact/Contact";
import Profile from "../pages/Profile/Profile";
import Logout from "../pages/Logout/Logout";
import useTokenRefresh from "../hooks/useTokenRefresh";
import Admin from "../pages/Admin/Admin";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import Checkout from "../pages/Checkout/Checkout";
import CheckoutSuccess from "../pages/CheckoutSuccess/CheckoutSuccess";

const RoutesTree = () => {
    useTokenRefresh();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login/*" element={<Login state="/" />} />
            <Route path="/ticketing" element={<Ticketing />} />
            <Route path="/ToS" element={<ToS />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route
                path="/admin"
                element={<ProtectedAdminRoute element={Admin} />}
            />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default RoutesTree;
