import "./Admin.css";
import { fetchAPI } from "../../utils/utils";
import { useEffect, useState } from "react";
import {
    Offer,
    OfferResponse,
} from "../../components/TicketGallery/TicketGallery";
import AdminOfferForm from "../../components/AdminOfferForm/AdminOfferForm";

export interface OfferProp {
    name: string;
    description: string;
    numberTickets: number;
    price: number;
    key: string;
    index: number;
    uuid: string;
    setOffersList: (offersList: Offer[]) => void;
    offersList: Offer[];
}

interface ErrorResponse {
    data: {
        code: number;
        message: string;
    };
}

const Admin = () => {
    const [offersList, setOffersList] = useState<Offer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: OfferResponse | ErrorResponse = await fetchAPI(
                    "https://api.enzolouail.fr/api/v1/offers",
                    "GET"
                );

                if ("data" in response && "code" in response.data) {
                    console.error(
                        "Error fetching data:",
                        response.data.message
                    );
                } else {
                    setOffersList((response as OfferResponse).data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="admin">
            <h1 className="admin__title">Page d'administration</h1>
            <div className="admin__offers-list">
                <h2 className="admin__offers-title">Modifier les offres</h2>
                {offersList?.map((offer: Offer, index) => (
                    <AdminOfferForm
                        key={offer.uuid}
                        name={offer.name}
                        description={offer.description}
                        numberTickets={offer.numberTickets}
                        price={offer.price}
                        index={index}
                        uuid={offer.uuid}
                        setOffersList={setOffersList}
                        offersList={offersList}
                    />
                ))}

                <h2 className="admin__offers-title">Ajouter une offre</h2>
                <AdminOfferForm
                    key="new"
                    name=""
                    description=""
                    numberTickets={0}
                    price={0}
                    index={offersList.length}
                    uuid=""
                    setOffersList={setOffersList}
                    offersList={offersList}
                />
            </div>
        </div>
    );
};

export default Admin;
