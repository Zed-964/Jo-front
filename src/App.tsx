import "./style/App.css";
import RoutesTree from "./router/RoutesTree";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BasketContentProvider from "./providers/BasketContentProvider";
import UserInfosProvider from "./providers/UserInfosProvider";
import UserStatusProvider from "./providers/UserStatusProvider";

function App() {
    return (
        <div className="main">
                <UserInfosProvider>
                    <UserStatusProvider>
                        <BasketContentProvider>
                            <Router>
                                <Header />
                                <RoutesTree />
                                <Footer />
                            </Router>
                        </BasketContentProvider>
                    </UserStatusProvider>
                </UserInfosProvider>
        </div>
    );
}

export default App;
