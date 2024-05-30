import "./AdminOfferForm.css";
import { useEffect, useState } from "react";
import { OfferProp } from "../../pages/Admin/Admin";
import { fetchAPIWithBody } from "../../utils/utils";
import useUserInfos from "../../hooks/useUserInfos";
import { GiTicket } from "react-icons/gi";
import { IconContext } from "react-icons";

const AdminOfferForm = (props: OfferProp) => {
    const [name, setName] = useState<string>(props.name || "");
    const [description, setDescription] = useState<string>(
        props.description || ""
    );
    const [numberTickets, setNumberTickets] = useState<number>(
        props.numberTickets || 0
    );
    const [price, setPrice] = useState<number>(props.price || 0);

    const { userInfos } = useUserInfos();

    useEffect(() => {
        if (props.name) setName(props.name);
        if (props.description) setDescription(props.description);
        if (props.numberTickets) setNumberTickets(props.numberTickets);
        if (props.price) setPrice(props.price);
    }, [props]);

    const handleValidate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!name || !description || !numberTickets || !price) {
            return;
        }

        let body = {
            uuid: props.uuid,
            name,
            description,
            numberTickets,
            price,
        };

        try {
            if (props.name !== "") {
                await fetchAPIWithBody(
                    `https://api.enzolouail.fr/api/v1/offers/${props.uuid}`,
                    "PUT",
                    body,
                    userInfos.token || ""
                );
                props.setOffersList(
                    props.offersList.map((o) =>
                        o.uuid === props.uuid ? { ...o, ...body } : o
                    )
                );
            } else {
                let bodyWithoutUuid = {
                    name,
                    description,
                    numberTickets,
                    price,
                };
                const data = await fetchAPIWithBody(
                    "https://api.enzolouail.fr/api/v1/offers",
                    "POST",
                    bodyWithoutUuid,
                    userInfos.token || ""
                );

                const newOffer = {
                    ...data.data,
                    owners: [],
                };
                props.setOffersList([...props.offersList, newOffer]);
            }
        } catch (error) {
            console.error("Error while creating or updating offer:", error);
        }

        setName("");
        setDescription("");
        setNumberTickets(0);
        setPrice(0);
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await fetchAPIWithBody(
                `https://api.enzolouail.fr/api/v1/offers/${props.uuid}`,
                "DELETE",
                "",
                userInfos.token || ""
            );

            props.setOffersList(
                props.offersList.filter((o) => o.uuid !== props.uuid)
            );

        } catch (error) {
            console.error("Error while deleting offer:", error);
        }
    };

    return (
        <div className="admin-offer-form">
            {props.name && (
                <h2 className="admin-offer-form__title">
                    Offre n°{props.index + 1}
                </h2>
            )}

            <form className="admin-offer-form__form">
                <div className="admin-offer-form__inputs">
                    <input
                        type="text"
                        placeholder="Nom de l'offre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="admin-offer-form__input admin-offer-form__input--name"
                    />
                    <div className="numberTickets-label">
                        <input
                            type="number"
                            placeholder="Nombre de tickets"
                            value={numberTickets}
                            min={0}
                            onChange={(e) =>
                                setNumberTickets(parseInt(e.target.value))
                            }
                            className="no-arrows admin-offer-form__input admin-offer-form__input--numberTickets"
                        />
                        <IconContext.Provider
                            value={{ color: "rgba(0,0,0,.8)", size: "32px" }}
                        >
                            <GiTicket />
                        </IconContext.Provider>
                    </div>
                    <div className="price-label">
                        <input
                            type="number"
                            placeholder="Prix"
                            value={price}
                            min={0}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            className="no-arrows admin-offer-form__input admin-offer-form__input--price"
                        />
                        <span className="price-label__euro">€</span>
                    </div>
                    {props.name ? (
                        <div className="admin-offer-form__buttons">
                            <button
                                className="admin-offer-form__button edit"
                                onClick={handleValidate}
                            >
                                Valider
                            </button>
                            <button
                                className="admin-offer-form__button delete"
                                onClick={handleDelete}
                            >
                                Supprimer
                            </button>
                        </div>
                    ) : (
                        <div className="admin-offer-form__buttons">
                            <button
                                onClick={handleValidate}
                                className="admin-offer-form__button create"
                            >
                                Créer
                            </button>
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Description de l'offre"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="admin-offer-form__input admin-offer-form__input--description"
                />
            </form>
        </div>
    );
};

export default AdminOfferForm;
