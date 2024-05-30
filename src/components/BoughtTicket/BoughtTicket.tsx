import { usePDF } from "react-to-pdf";
import "./BoughtTicket.css";
import useUserInfos from "../../hooks/useUserInfos";
import QRCode from "react-qr-code";

export interface BoughtTicket {
    uuid: string;
    firstname: string;
    lastname: string;
    date: string;
    userId: string;
}

export interface BoughtTicketProps {
    ticket: BoughtTicket;
}

const BoughtTicket = (props: BoughtTicketProps) => {
    const ticket = props.ticket;
    const { toPDF, targetRef } = usePDF({ filename: "ticket.pdf" });
    const { userInfos } = useUserInfos();
    const email = userInfos.email;
    const name = userInfos.firstName + " " + userInfos.lastName;

    return (
        <div className="boughtTicketWrapper">
            <div className="boughtTicket" ref={targetRef}>
                <div className="boughtTicket__header">
                    <img
                        src="/assets/img/logos/olympics-logo.svg"
                        alt="logo"
                        className="boughtTicket__logo"
                    />
                    <span className="boughtTicket__title">
                        Votre billet unitaire pour les JO de Paris 2024.
                    </span>
                </div>
                <div className="boughtTicket__content">
                    <div className="boughtTicket__content__left">
                        <div className="boughtTicket__content__left__container">
                            <span className="boughtTicket__content__left__title">
                                Nom:
                            </span>
                            <span className="boughtTicket__content__left__value">
                                {" " + ticket.firstname}
                            </span>
                        </div>
                        <div className="boughtTicket__content__left__container">
                            <span className="boughtTicket__content__left__title">
                                Prénom:
                            </span>
                            <span className="boughtTicket__content__left__value">
                                {" " + ticket.lastname}
                            </span>
                        </div>
                        <div className="boughtTicket__content__left__container">
                            <span className="boughtTicket__content__left__title">
                                Date d'achat:
                            </span>
                            <span className="boughtTicket__content__left__value">
                                {" " + ticket.date}
                            </span>
                        </div>
                        <div className="boughtTicket__content__left__container">
                            <span className="boughtTicket__content__left__title">
                                Nom de l'acheteur:
                            </span>
                            <span className="boughtTicket__content__left__value">
                                {" " + name}
                            </span>
                        </div>
                        <div className="boughtTicket__content__left__container">
                            <span className="boughtTicket__content__left__title">
                                Email de l'acheteur:
                            </span>
                            <span className="boughtTicket__content__left__value">
                                {" " + email}
                            </span>
                        </div>
                    </div>
                    <div className="boughtTicket__content__right">
                        <div className="boughtTicket__content__right__container">
                            <QRCode value={JSON.stringify(ticket)} size={200} />
                        </div>
                    </div>
                </div>
                <div className="boughtTicket__footer">
                    <h1 className="boughtTicket__footer__text boughtTicket__footer__h1">
                        Merci pour votre achat!
                    </h1>
                    <span className="boughtTicket__footer__text boughtTicket__footer__italic">
                        Veuillez présenter ce billet à l'entrée de l'évènement.
                        Un justificatif d'identité pourra vous être demandé
                        conjointement à ce billet.
                    </span>
                    <div className="boughtTicket__footer__ToS__container">
                        <h2 className="boughtTicket__footer__h2">
                            Conditions d'utilisation:
                        </h2>
                        <span className="boughtTicket__footer__text">
                            - Ce billet est valable pour une seule personne.
                        </span>
                        <span className="boughtTicket__footer__text">
                            - Ce billet est valable pour une seule entrée.
                        </span>
                        <span className="boughtTicket__footer__text">
                            - Ce billet est nominatif.
                        </span>
                        <span className="boughtTicket__footer__text">
                            - Ce billet n'est ni échangeable, ni remboursable.
                        </span>
                        <span className="boughtTicket__footer__text boughtTicket__footer__marginTop">
                            En cas de perte, un duplicata pourra vous être
                            fourni sur présentation d'une pièce d'identité, dans
                            les sept (7) jours suivant la date de l'évènement.
                        </span>
                    </div>
                </div>
            </div>
            <button
                className="boughtTicket__button"
                onClick={() => toPDF()}
            >
                Télécharger le billet
            </button>
        </div>
    );
};

export default BoughtTicket;
