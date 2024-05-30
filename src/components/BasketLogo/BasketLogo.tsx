import "./BasketLogo.css";
import { MdShoppingBasket } from "react-icons/md";
import { IconContext } from "react-icons";
import useBasketContent from "../../hooks/useBasketContent";
import { useEffect, useState } from "react";

const BasketLogo = () => {
    const { basketContent } = useBasketContent();
    const [parsedBasketContent, setParsedBasketContent] = useState([]);

    useEffect(() => {
        if (basketContent.length > 0) {
            setParsedBasketContent(JSON.parse(basketContent));
        }
    }, [basketContent]);

    const handleBasketClick = () => {
        location.href = "/basket";
    };

    return (
        <div
            className="basket-logo__wrapper"
            role="button"
            tabIndex={0}
            onClick={() => handleBasketClick()}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleBasketClick();
                }
            }}
        >
            <div className="basket-logo">
                <IconContext.Provider
                    value={{ className: "basket-logo__icon" }}
                >
                    <MdShoppingBasket />
                </IconContext.Provider>
            </div>
            <div className="basket-logo__counter">
                {parsedBasketContent.length}
            </div>
        </div>
    );
};

export default BasketLogo;
