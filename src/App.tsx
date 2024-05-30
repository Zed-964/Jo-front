import "./style/App.css";
import RoutesTree from "./router/RoutesTree";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
    console.log("hello world");

    return (
        <div className="main">
            <Router>
                <Header />
                <RoutesTree />
                <Footer />
            </Router>
        </div>
    );
}

export default App;
