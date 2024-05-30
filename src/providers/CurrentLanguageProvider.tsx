import { useState, useEffect, createContext, ReactNode } from "react";

export const CurrentLanguageContext = createContext({
    currentLanguage: "",
    setCurrentLanguage: (language: string) => {},
});

const CurrentLanguageProvider = ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setCurrentLanguage] = useState(
        localStorage.getItem("currentLanguage") || "en"
    );
    const locale = navigator.language;

    useEffect(() => {
        localStorage.setItem("currentLanguage", currentLanguage);
    }, [currentLanguage]);


    return (
        <CurrentLanguageContext.Provider
            value={{ currentLanguage, setCurrentLanguage }}
        >
            {children}
        </CurrentLanguageContext.Provider>
    );
};

export default CurrentLanguageProvider;
