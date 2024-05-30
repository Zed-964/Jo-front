import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Basket from "../pages/Basket";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";



const RoutesTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ticketing" element={<About />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default RoutesTree;
