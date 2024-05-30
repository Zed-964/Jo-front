import { useState, useEffect, createContext, ReactNode } from "react";

export const CurrentLanguageContext = createContext({
    currentLanguage: "",
    setCurrentLanguage: (language: string) => {},
});

const CurrentLanguageProvider = ({ children }: { children: ReactNode }) => {
    const locale = navigator.language.split("-")[0]; // Gets the language from the browser settings

    const [currentLanguage, setCurrentLanguage] = useState(
        localStorage.getItem("currentLanguage") ?? locale ?? "en"// Default language is the local storage value if it exists, if it doesn't, it takes the locale language from navigator, and if not recognized, it will default to English 
    );

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
