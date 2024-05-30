import React, { useState } from "react";
import "./Checkout.css";
import useUserInfos from "../../hooks/useUserInfos";
import useBasketContent from "../../hooks/useBasketContent";
import {
    buildCheckoutObject,
    decodeJWT,
    fetchAPIWithBody,
    CheckoutObject,
} from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

interface CheckoutState {
    cardNumber: number | null; 
    expirationDate: string;
    securityCode: string;
    errorMessage: string;
}

const Checkout: React.FC = () => {
    const { userInfos } = useUserInfos();
    const [state, setState] = useState<CheckoutState>({
        cardNumber: null, 
        expirationDate: "",
        securityCode: "",
        errorMessage: "",
    });

    const userConnected = userInfos.isConnected;

    const { basketContent } = useBasketContent();

    if (!userConnected) {
        window.location.href = "/";
        return null;
    }

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, "");
        setState({
            ...state,
            cardNumber: parseInt(input.slice(0, 16)) || null,
        }); 
    };

    const handleExpirationDateChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = e.target.value.replace(/\D/g, "");
        if (input.length <= 4) {
            setState({
                ...state,
                expirationDate: input.replace(/(\d{2})(\d)/, "$1/$2"),
            });
        }
    };

    const handleSecurityCodeChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = e.target.value.replace(/\D/g, "");
        setState({ ...state, securityCode: input.slice(0, 3) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (state.cardNumber !== null) {
            if (!isValidCardNumber(state.cardNumber.toString())) {
                setState({
                    ...state,
                    errorMessage: "Veuillez entrer un numéro de carte valide.",
                });
                return;
            }
        }
        if (state.cardNumber === null) {
            setState({
                ...state,
                errorMessage: "Veuillez entrer un numéro de carte.",
            });
            return;
        }
        if (!isValidExpirationDate(state.expirationDate)) {
            setState({
                ...state,
                errorMessage:
                    "Veuillez entrer une date d'expiration valide (MM/YY).",
            });
            return;
        }
        if (!isValidSecurityCode(state.securityCode)) {
            setState({
                ...state,
                errorMessage: "Veuillez entrer un code de sécurité valide.",
            });
            return;
        }
        setState({ ...state, errorMessage: "" });
        handlePaiement();
    };

    const isValidCardNumber = (number: string): boolean => {
        return number.length === 16;
    };

    const isValidExpirationDate = (date: string): boolean => {
        const regex = /^\d{2}\/\d{2}$/;
        if (!regex.test(date)) {
            return false;
        }
        const [monthStr, yearStr] = date.split("/");
        const month = parseInt(monthStr, 10);
        const year = parseInt(yearStr, 10) + 2000;
        const maxYear = new Date().getFullYear() + 30;

        if (month < 1 || month > 12) {
            return false;
        }

        if (year < new Date().getFullYear() || year > maxYear) {
            return false;
        }

        return true;
    };

    const isValidSecurityCode = (code: string): boolean => {
        const regex = /^\d{3}$/;
        return regex.test(code);
    };

    const fetchAPIForPaiement = async (checkoutData: CheckoutObject) => {
        try {
            const response = await fetchAPIWithBody(
                "https://api.enzolouail.fr/api/v1/tickets/payment",
                "POST",
                checkoutData,
                userInfos.token || ""
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const handlePaiement = async () => {
        const holderName = decodeJWT(userInfos.token).name;

        if (state.cardNumber !== null) {
            const owners: { firstname: string; lastname: string }[] = [];

            JSON.parse(basketContent).forEach((item: any) => {
                item.owners.forEach(
                    (owner: { firstname: string; lastname: string }) => {
                        owners.push(owner);
                    }
                );
            });

            console.warn(owners);

            const checkoutData = buildCheckoutObject({
                number: state.cardNumber,
                holderName: holderName,
                expirationDate: state.expirationDate,
                securityCode: state.securityCode,
                amount: JSON.parse(basketContent)
                    .reduce((acc: number, item: any) => acc + item.price, 0)
                    .toFixed(2),
                tickets: owners,
            });

            const response = await fetchAPIForPaiement(checkoutData);

            console.log(JSON.stringify(response));
            console.log(response);
            if (
                response.data !== undefined &&
                response.data !== null &&
                response.data !== "" &&
                !(response.data.code?.length > 0)
            ) {
                sessionStorage.setItem(
                    "boughtTickets",
                    JSON.stringify(response.data)
                );
                window.location.href = "/checkout/success";
            } else {
                setState({
                    ...state,
                    errorMessage: "Une erreur est survenue lors du paiement.",
                });
            }
        }
    };

    return (
        <div className="checkout">
            <div className="checkout__header">
                <h1 className="checkout__h1">Paiement de votre commande</h1>
                <h2 className="checkout__h2">Récapitulatif:</h2>
                <ul className="checkout__ul">
                    {JSON.parse(basketContent).map(
                        (item: any, index: number) => (
                            <li className="checkout__li" key={uuidv4()}>
                                - Offre {item.name} - {item.price.toFixed(2)} €
                            </li>
                        )
                    )}
                    <li className="checkout__li checkout__total">
                        Total:{" "}
                        {JSON.parse(basketContent)
                            .reduce(
                                (acc: number, item: any) => acc + item.price,
                                0
                            )
                            .toFixed(2)}{" "}
                        €
                    </li>
                </ul>
            </div>
            <h2 className="checkout__h2">
                Veuillez entrer vos informations bancaires.
            </h2>
            <h3 className="checkout__h3">
                Le paiement est sécurisé via le service reconnu Stripe
            </h3>

            <form className="checkout__form" onSubmit={handleSubmit}>
                <label htmlFor="cardNumber">Numéro de carte</label>
                <input
                    type="number"
                    id="cardNumber"
                    name="cardNumber"
                    value={state.cardNumber ? state.cardNumber : ""}
                    onChange={handleCardNumberChange}
                    maxLength={16}
                    className="checkout__input card-number-input card-no-arrows"
                />
                <div className="checkout__date-cvv">
                    <div className="checkout__input__container">
                        <label htmlFor="expirationDate">
                            Date d'expiration (MM/YY)
                        </label>
                        <input
                            type="text"
                            id="expirationDate"
                            name="expirationDate"
                            value={state.expirationDate}
                            onChange={handleExpirationDateChange}
                            maxLength={5}
                            className="checkout__input expiration-date-input"
                        />
                    </div>
                    <div className="checkout__input__container">
                        <label htmlFor="securityCode">
                            Code de sécurité (CVV)
                        </label>
                        <input
                            type="text"
                            id="securityCode"
                            name="securityCode"
                            value={state.securityCode}
                            onChange={handleSecurityCodeChange}
                            maxLength={3}
                            className="checkout__input security-code-input"
                        />
                    </div>
                </div>
                {state.errorMessage && (
                    <p className="error-message">{state.errorMessage}</p>
                )}

                <button type="submit" className="checkout__button">
                    Payer
                </button>
            </form>
        </div>
    );
};

export default Checkout;
