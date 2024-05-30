import "./TicketGallery.css";
import TicketCard from "../TicketCard/TicketCard";
import { fetchAPI } from "../../utils/utils";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Owner {
    firstname: string;
    lastname: string;
}

export interface Offer {
    uuid: string;
    name: string;
    description: string;
    numberTickets: number;
    price: number;
    owners: Owner[];
}

export interface OfferResponse {
    data: Offer[];
}

const TicketGallery = () => {
    const [offersList, setOffersList] = useState<Offer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data: OfferResponse = await fetchAPI(
                "https://api.enzolouail.fr/api/v1/offers",
                "GET"
            );
            setOffersList(data.data);
        };
        fetchData();
    }, []);

    return (
        <div className="ticketGallery">
            {offersList.length > 0 &&
                offersList?.map((offer: Offer) => {
                    return <TicketCard key={uuidv4()} {...offer} />;
                })}
        </div>
    );
};

export default TicketGallery;
