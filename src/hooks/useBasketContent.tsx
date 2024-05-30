import { useContext } from "react";
import { BasketContentContext } from "../providers/BasketContentProvider";

const useBasketContent = () => {
    const context = useContext(BasketContentContext);

    if (!context) {
        throw new Error(
            "useBasketContent must be used within a BasketContentProvider"
        );
    }

    return context;
};

export default useBasketContent;
