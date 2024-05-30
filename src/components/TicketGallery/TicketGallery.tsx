import "./TicketGallery.css";
import TicketCard from "../TicketCard/TicketCard";
import { fetchLocalFiles } from "../../utils/utils";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Owner {
    firstName: string;
    lastName: string;
}

export interface Offer {
    uuid: string;
    name: string;
    description: string;
    numberTickets: number;
    price: number;
    owners: Owner[];
}

interface OfferResponse {
    data: Offer[];
}

const TicketGallery = () => {
    const [offersList, setOffersList] = useState<Offer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data: OfferResponse = await fetchLocalFiles(
                "assets/json/tempCardList.json"
            );
            setOffersList(data.data);
        };
        fetchData();
    }, []);
    console.log(offersList);

    return (
        <div className="ticketGallery">
            {offersList?.map((offer: Offer) => {
                return <TicketCard key={uuidv4()} {...offer} />;
            })}
        </div>
    );
};

export default TicketGallery;
