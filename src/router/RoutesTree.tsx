import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Basket from "../pages/Basket/Basket";
import Login from "../pages/Login/Login";
import Ticketing from "../pages/Ticketing/Ticketing";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ToS from "../pages/ToS/ToS";
import Privacy from "../pages/Privacy/Privacy";
import Contact from "../pages/Contact/Contact";



const RoutesTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ticketing" element={<Ticketing />} />
            <Route path="/ToS" element={<ToS />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};


export default RoutesTree;
