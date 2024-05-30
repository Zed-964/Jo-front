import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Basket from "../pages/Basket/Basket";
import Login from "../pages/Login/Login";
import Ticketing from "../pages/Ticketing/Ticketing";
import ErrorPage from "../pages/ErrorPage/ErrorPage";



const RoutesTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ticketing" element={<Ticketing />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default RoutesTree;
