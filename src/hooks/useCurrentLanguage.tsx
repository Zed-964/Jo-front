import { useContext } from "react";
import { CurrentLanguageContext } from "../providers/CurrentLanguageProvider";

const useCurrentLanguage = () => {
    const context = useContext(CurrentLanguageContext);

    if (!context) {
        throw new Error(
            "useCurrentLanguage must be used within a CurrentLanguageProvider"
        );
    }

    return context;
};

export default useCurrentLanguage;
