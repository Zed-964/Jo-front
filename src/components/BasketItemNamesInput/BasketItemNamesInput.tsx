import "./BasketItemNamesInput.css";
import { useState, useEffect } from "react";

interface BasketItemNamesInputProps {
    index: number;
    itemIndex: number;
    firstname: string;
    lastname: string;
    basketContent: string;
    setBasketContent: (basketContent: string) => void;
}

const BasketItemNamesInput = (props: BasketItemNamesInputProps) => {
    const [firstname, setFirstName] = useState<string>(props.firstname);
    const [lastname, setLastName] = useState<string>(props.lastname);

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
                firstname: "",
                lastname: "",
            };
        }
        basket[props.itemIndex].owners[props.index].firstname = firstname;
        basket[props.itemIndex].owners[props.index].lastname = lastname;
        props.setBasketContent(JSON.stringify(basket));
    };

    useEffect(() => {
        setFirstName(props.firstname);
        setLastName(props.lastname);
    }, [props.firstname, props.lastname]);

    return (
        <div className="basketItemNamesInput">
            <input
                type="text"
                value={firstname}
                placeholder="Prénom(s)"
                className="basket-item__input basket-firstName__input"
                onChange={handleChangeFirstName}
                onBlur={handleValidateNames}
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
                                "Tab"
                            ].includes(e.key)) ||
                        e.key === "_"
                    ) {
                        e.preventDefault();
                    }
                }}
            />
            <input
                type="text"
                value={lastname}
                placeholder="Nom"
                className="basket-item__input basket-lastName__input"
                onChange={handleChangeLastName}
                onBlur={handleValidateNames}
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
                                "Tab"
                            ].includes(e.key)) ||
                        e.key === "_"
                    ) {
                        e.preventDefault();
                    }
                }}
            />
        </div>
    );
};

export default BasketItemNamesInput;
