import { useState, useEffect, createContext, ReactNode } from "react";

export const CurrentLanguageContext = createContext({
    currentLanguage: "",
    setCurrentLanguage: (language: string) => {},
});

const CurrentLanguageProvider = ({ children }: { children: ReactNode }) => {
    const [currentLanguage, setCurrentLanguage] = useState("");
    const locale = navigator.language;

    useEffect(() => {
        if (locale.startsWith("fr")) {
            setCurrentLanguage("fr");
        } else {
            setCurrentLanguage("en");
        }
    }, [locale]);

    return (
        <CurrentLanguageContext.Provider
            value={{ currentLanguage, setCurrentLanguage }}
        >
            {children}
        </CurrentLanguageContext.Provider>
    );
}; 

export default CurrentLanguageProvider;
