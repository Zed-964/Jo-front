import "./Basket.css";
import useBasketContent from "../../hooks/useBasketContent";
import BasketItem from "../../components/BasketItem/BasketItem";
import useUserInfos from "../../hooks/useUserInfos";
import Login from "../Login/Login";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Basket = () => {
    const { basketContent } = useBasketContent();
    const { userInfos } = useUserInfos();

    const [isBasketReadyToPay, setIsBasketReadyToPay] =
        useState<boolean>(false);

    const handleValidate = () => {
            window.location.href = "/checkout";
    };


    useEffect(() => {
        if (
            basketContent === "" ||
            basketContent === "[]" ||
            basketContent === null
        ) {
            setIsBasketReadyToPay(false);
        } else {
            const basket = JSON.parse(basketContent);
            let isReady = true;
            for (const item of basket) {
                for (const owner of item.owners) {
                    if (
                        owner.firstname === "" ||
                        owner.lastname === ""
                    ) {
                        isReady = false;
                        break;
                    }
                }
            }
            setIsBasketReadyToPay(isReady);
        }
    }, [basketContent]);



    const basketPage = () => {
        if (
            basketContent === "" ||
            basketContent === "[]" ||
            basketContent === null
        ) {
            return (
                <div className="basket">
                    <h1>Votre panier est vide</h1>
                </div>
            );
        } else {
            const basket = JSON.parse(basketContent);
            return (
                <div className="basket">
                    <div className="basket__title">
                        <h1>Votre panier</h1>
                    </div>
                    <ul className="basket__ul">
                        {basket.map((item: any, index: number) => (
                            <BasketItem
                                key={uuidv4()}
                                index={index}
                                name={item.name}
                                uuid={item.uuid}
                                numberTickets={item.numberTickets}
                                description={item.desc}
                                price={item.price}
                                owners={item.owners}
                            />
                        ))}
                    </ul>
                    <div className="basket__validate">
                        <button
                            className={`basket__button ${
                                isBasketReadyToPay ? "" : "disabled"
                            }`}
                            disabled={!isBasketReadyToPay}
                            onClick={handleValidate}
                        >
                            Accéder à la page de paiement
                        </button>
                        {isBasketReadyToPay ? (
                            ""
                        ) : (
                            <span className="tooltip">
                                Veuillez remplir tous les champs.
                            </span>
                        )}
                    </div>
                </div>
            );
        }
    };

    if (userInfos.isConnected) {
        return basketPage();
    } else {
        return <Login state="basket" />;
    }
    // }
};

export default Basket;
