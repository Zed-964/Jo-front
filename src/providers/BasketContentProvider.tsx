import { useState, useEffect, createContext, ReactNode } from "react";

export const BasketContentContext = createContext({
    basketContent: "",
    setBasketContent: (content: string) => {},
});

const BasketContentProvider = ({ children }: { children: ReactNode }) => {
    const [basketContent, setBasketContent] = useState(
        localStorage.getItem("BasketContent") ?? "" // Default Content is the localStorage value, otherwise the default is an empty string
    );

    useEffect(() => {
        localStorage.setItem("BasketContent", basketContent);
    }, [basketContent]);

    return (
        <BasketContentContext.Provider
            value={{ basketContent, setBasketContent }}
        >
            {children}
        </BasketContentContext.Provider>
    );
};

export default BasketContentProvider;
