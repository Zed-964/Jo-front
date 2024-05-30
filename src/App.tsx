import "./style/App.css";
import RoutesTree from "./router/RoutesTree";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CurrentLanguageProvider from "./providers/CurrentLanguageProvider";
// import PageContentProvider from "./providers/PageContentProvider";
import BasketContentProvider from "./providers/BasketContentProvider";
import UserInfosProvider from "./providers/UserInfosProvider";
import UserStatusProvider from "./providers/UserStatusProvider";

function App() {
    return (
        <div className="main">
            <CurrentLanguageProvider>
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
            </CurrentLanguageProvider>
        </div>
    );
}

export default App;
