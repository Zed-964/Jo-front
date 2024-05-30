import "./Header.css";
import Logo from "../Logo/Logo";
import ProfileSelector from "../ProfileSelector/ProfileSelector";
import BasketLogo from "../BasketLogo/BasketLogo";

const Header = () => {
    const logoHeight: string = "150px";
    const logoWidth: string =
        Math.round(0.878787878787 * parseInt(logoHeight)) + "px";

    return (
        <header className="header">
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
                <BasketLogo />
                <ProfileSelector />
            </div>
        </header>
    );
};

export default Header;
