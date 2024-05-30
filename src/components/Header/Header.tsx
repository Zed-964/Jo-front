import "./Header.css";
import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import ProfileSelector from "../ProfileSelector/ProfileSelector";
import { useState } from "react";

const Header = () => {
    const logoHeight: string = "150px";
    const logoWidth: string =
        Math.round(0.878787878787 * parseInt(logoHeight)) + "px";

    const [isConnected, setIsConnected] = useState(false);

    return (
        <header className="header">
            <div className="language__selector__wrapper">
                <LanguageSelector />
            </div>
            <button
                className="header__logo__button"
                onClick={() => (window.location.href = "/")}
            >
                <Logo
                    src="/assets/img/logos/olympics-logo.svg"
                    alt="Olympics Logo"
                    width={logoWidth}
                    height={logoHeight}
                    classes="header__logo"
                />
            </button>
            <div className="profile__wrapper">
                <ProfileSelector isConnected/>
            </div>
        </header>
    );
};

export default Header;
