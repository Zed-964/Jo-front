import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style/App.css";
import RoutesTree from "./router/RoutesTree";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="main">
            <RoutesTree />
        </div>
    );
}

export default App;
