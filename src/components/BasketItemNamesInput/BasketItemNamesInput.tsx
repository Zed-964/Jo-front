import "./BasketItemNamesInput.css";
import { useState, useEffect } from "react";

interface BasketItemNamesInputProps {
    index: number;
    itemIndex: number;
    firstName: string;
    lastName: string;
    basketContent: string;
    setBasketContent: (basketContent: string) => void;
}

const BasketItemNamesInput = (props: BasketItemNamesInputProps) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);

    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleValidateNames = () => {
        let basket = JSON.parse(props.basketContent);
        if (!basket[props.itemIndex].owners[props.index]) {
            basket[props.itemIndex].owners[props.index] = {
                firstName: "",
                lastName: "",
            };
        }
        basket[props.itemIndex].owners[props.index].firstName = firstName;
        basket[props.itemIndex].owners[props.index].lastName = lastName;
        props.setBasketContent(JSON.stringify(basket));
    };

    useEffect(() => {
        setFirstName(props.firstName);
        setLastName(props.lastName);
    }, [props.firstName, props.lastName]);

    return (
        <div className="basketItemNamesInput">
            <input
                type="text"
                value={firstName}
                placeholder="Prénom(s)"
                className="basket-item__input basket-firstName__input"
                onChange={handleChangeFirstName}
                maxLength={40}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleValidateNames();
                    } else if (e.key === "Escape") {
                        setFirstName("");
                        setLastName("");
                    } else if (
                        (!/^[a-zA-Z\u00C0-\u024F\- ]$/.test(e.key) &&
                            ![
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "ArrowUp",
                                "ArrowDown",
                            ].includes(e.key)) ||
                        e.key === "_"
                    ) {
                        e.preventDefault();
                    }
                }}
            />
            <input
                type="text"
                value={lastName}
                placeholder="Nom"
                className="basket-item__input basket-lastName__input"
                onChange={handleChangeLastName}
                maxLength={40}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleValidateNames();
                    } else if (e.key === "Escape") {
                        setFirstName("");
                        setLastName("");
                    } else if (
                        (!/^[a-zA-Z\u00C0-\u024F\- ]$/.test(e.key) &&
                            ![
                                "Backspace",
                                "Delete",
                                "ArrowLeft",
                                "ArrowRight",
                                "ArrowUp",
                                "ArrowDown",
                            ].includes(e.key)) ||
                        e.key === "_"
                    ) {
                        e.preventDefault();
                    }
                }}
            />
            <button
                className="basket-item__button basket-item__validate__names"
                onClick={handleValidateNames}
            >
                Valider
            </button>
        </div>
    );
};

export default BasketItemNamesInput;
