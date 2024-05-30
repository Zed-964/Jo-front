import "./Basket.css";
import useBasketContent from "../../hooks/useBasketContent";
import BasketItem from "../../components/BasketItem/BasketItem";

const Basket = () => {
    const { basketContent } = useBasketContent();

    const parseBasket = () => {
        if (basketContent === "" || basketContent === "[]" || basketContent === null) {
            return (
                <div className="basket">
                    <h1>Votre panier est vide</h1>
                </div>
            );
        } else {
            const basket = JSON.parse(basketContent);
            return (
                <div className="basket">
                    <ul className="basket__ul">
                        {basket.map((item: any, index: number) => (
                            <BasketItem
                                key={index}
                                index={index}
                                name={item.title}
                                uuid={item.uuid}
                                numberTickets={item.numberTickets}
                                description={item.desc}
                                price={item.price}
                                owners={item.owners}
                            />
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return parseBasket();
};

export default Basket;
