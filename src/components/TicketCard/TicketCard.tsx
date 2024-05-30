import "./TicketCard.css";
import { Offer } from "../TicketGallery/TicketGallery.tsx";
import { GiTicket } from "react-icons/gi";
import { IconContext } from "react-icons";
import { GoChevronDown } from "react-icons/go";
import { useState, useEffect } from "react";
import useBasketContent from "../../hooks/useBasketContent";

const TicketCard = (offer: Offer) => {
    const { basketContent, setBasketContent } = useBasketContent();

    const [chevronStyle, setChevronStyle] = useState("chevron");
    const [descriptionStyle, setDescriptionStyle] = useState(
        "hidden__description"
    );

    const handleChevronClick = () => {
        if (chevronStyle === "chevron") {
            setChevronStyle("chevron__reverse");
            setDescriptionStyle("shown__description");
        } else {
            setChevronStyle("chevron");
            setDescriptionStyle("hidden__description");
        }
    };

    const handleAddToBasket = () => {
        const basket = basketContent ? JSON.parse(basketContent) : [];
        const extendedOffer = { ...offer, owners: [] };
        const newBasket = [...basket, extendedOffer];
        console.log(newBasket);
        setBasketContent(JSON.stringify(newBasket));
    };

    return (
        <div className="ticketCardContainer">
            <div className="ticketCard__shown-content">
                <div className="ticketCard__logo__wrapper">
                    <div className="ticketCard ticketCard__numberOfTickets">
                        {offer.numberTickets}
                    </div>
                    <IconContext.Provider
                        value={{ color: "rgba(0,0,0,.8)", size: "32px" }}
                    >
                        <GiTicket />
                    </IconContext.Provider>
                </div>
                <div className="ticketCard ticketCard__offerName">
                    {"Offre " + offer.name.toLocaleUpperCase()}
                </div>
                <div className="ticketCard ticketCard__price">
                    {offer.price + " €"}
                </div>
                <button
                    className="ticketCard__chevron__wrapper"
                    onClick={handleChevronClick}
                >
                    <IconContext.Provider value={{ className: chevronStyle }}>
                        <GoChevronDown />
                    </IconContext.Provider>
                </button>
            </div>
            <div className={`ticketCard__hidden-content ${descriptionStyle}`}>
                <div className="ticketCard__description">
                    <p>{offer.description} </p>
                    {/* <p>
                        Information billet : Place numérotée pour toutes les
                        catégories
                    </p> */}
                </div>
                <button
                    className="ticketCard__button"
                    onClick={() => handleAddToBasket()}
                >
                    Réserver
                </button>
            </div>
        </div>
    );
};

export default TicketCard;
