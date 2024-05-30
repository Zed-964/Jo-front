import { useEffect } from "react";
import "./BasketItem.css";
import { Offer } from "../../components/TicketGallery/TicketGallery";
import useBasketContent from "../../hooks/useBasketContent";
import BasketItemNamesInput from "../BasketItemNamesInput/BasketItemNamesInput";

interface BasketItemProps extends Offer {
    index: number;
}

const BasketItem = (item: BasketItemProps) => {
    const { basketContent, setBasketContent } = useBasketContent();

    useEffect(() => {
        let basket = JSON.parse(basketContent);
        if (basket[item.index].owners.length <= 0) {
            for (let i = 0; i < item.numberTickets; i++) {
                basket[item.index].owners.push({ firstName: "", lastName: "" });
            }
            setBasketContent(JSON.stringify(basket));
        }
    }, [basketContent, item.index, item.numberTickets]);

    const handleDeleteItem = (index: number) => {
        let basket = JSON.parse(basketContent);
        basket.splice(index, 1);
        setBasketContent(JSON.stringify(basket));
    };

    return (
        <li className="basket-item">
            <div className="basket-item__firstDiv">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Prix: {item.price} €</p>
                <div className="basket-item__firstDiv__delete">
                    <button
                        className="basket-item__button basket-item__delete__item"
                        onClick={() => handleDeleteItem(item.index)}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
            {item.owners.map((owner, index) => (
                <BasketItemNamesInput
                    key={index}
                    index={index}
                    itemIndex={item.index}
                    basketContent={basketContent}
                    setBasketContent={setBasketContent}
                    firstName={owner.firstName}
                    lastName={owner.lastName}
                />
            ))}
        </li>
    );
};

export default BasketItem;
