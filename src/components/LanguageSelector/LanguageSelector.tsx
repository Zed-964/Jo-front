import "./LanguageSelector.css";
import { useEffect, useState, useMemo } from "react";
import { FaEarthEurope } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { IconContext } from "react-icons";
import useCurrentLanguage from "../../hooks/useCurrentLanguage";
import ClickAwayListener from "react-click-away-listener";

const LanguageSelector = () => {
    const { currentLanguage, setCurrentLanguage } = useCurrentLanguage();

    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
    const [languageSelectionBarProps, setLanguageSelectionBarProps] =
        useState("");
    const [chevronProps, setChevronProps] = useState("");

    useEffect(() => {
        if (isLanguageSelectorOpen) {
            setLanguageSelectionBarProps(
                "language__selector__selection__bar__open"
            );
            setChevronProps("language__selector__chevron__open");
        } else {
            setLanguageSelectionBarProps(
                "language__selector__selection__bar__closed"
            );
            setChevronProps("");
        }
    }, [isLanguageSelectorOpen]);

    const handleChangeLanguage = (value:string) => {
        return () => {
            // console.log(value);
            setCurrentLanguage(value);
        };
    };

    const chevronValue = useMemo(
        () => ({
            className: `language__selector__chevron ${chevronProps}`,
        }),
        [chevronProps]
    );

    const iconValue = useMemo(
        () => ({ className: "language__selector__icon" }),
        []
    );

    return (
        <ClickAwayListener onClickAway={() => setIsLanguageSelectorOpen(false)}>
            <div className="language__selector__container">
                <button
                    className="language__selector"
                    onClick={() =>
                        setIsLanguageSelectorOpen(!isLanguageSelectorOpen)
                    }
                >
                    <div className="language__selector__icon__wrapper">
                        <IconContext.Provider value={iconValue}>
                            <FaEarthEurope />
                        </IconContext.Provider>
                    </div>

                    <span className="language__selector__current__language">
                        {currentLanguage.toUpperCase()}
                    </span>

                    <IconContext.Provider value={chevronValue}>
                        <IoChevronDown />
                    </IconContext.Provider>
                </button>
                <div
                    className={`language__selector__selection__bar ${languageSelectionBarProps}`}
                >
                    <button onClick={handleChangeLanguage("en")}>
                        EN
                    </button>
                    <button onClick={handleChangeLanguage("fr")}>
                        FR
                    </button>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default LanguageSelector;
