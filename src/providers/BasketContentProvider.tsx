import { useState, useEffect, createContext, ReactNode } from "react";

export const BasketContentContext = createContext({
    basketContent: "",
    setBasketContent: (basketContent: string) => {},
});

const BasketContentProvider = ({ children }: { children: ReactNode }) => {
    const [basketContent, setBasketContent] = useState(
        sessionStorage.getItem("BasketContent") ?? "" // Default Content is the sessionStorage value, otherwise the default is an empty string
    );

    useEffect(() => {
        sessionStorage.setItem("BasketContent", basketContent);
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
