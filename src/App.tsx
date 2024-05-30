import "./style/App.css";
import RoutesTree from "./router/RoutesTree";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CurrentLanguageProvider from "./providers/CurrentLanguageProvider";
import PageContentProvider from "./providers/PageContentProvider";

function App() {
    console.log("hello world");

    return (
        <div className="main">
            <CurrentLanguageProvider>
                <PageContentProvider>
                    <Router>
                        <Header />
                        <RoutesTree />
                        <Footer />
                    </Router>
                </PageContentProvider>
            </CurrentLanguageProvider>
        </div>
    );
}

export default App;
