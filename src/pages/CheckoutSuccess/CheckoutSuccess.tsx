import "./CheckoutSuccess.css";
import BoughtTicket from "../../components/BoughtTicket/BoughtTicket";
import useBasketContent from "../../hooks/useBasketContent";

const CheckoutSuccess = () => {
    const rawBoughtTickets = sessionStorage.getItem("boughtTickets");
    if (rawBoughtTickets === null) {
        window.location.href = "/checkout";
    }

    const { setBasketContent } = useBasketContent();

    setBasketContent("[]");

    const boughtTickets = JSON.parse(rawBoughtTickets ?? "");
    
    return (
        <div className="checkoutSuccess">
            <h1 className="checkoutSuccess__title">Merci pour votre achat !</h1>
            <h2 className="checkoutSuccess__subtitle">
                Voici le récapitulatif de votre commande:
            </h2>

            <h2 className="checkoutSuccess__h2">
                {boughtTickets.length > 1 ? "Vos billets: " : "Votre billet: "}
            </h2>
            <div className="checkoutSuccess__ul">
                {boughtTickets.map((ticket: any) => {
                    return <BoughtTicket key={ticket.uuid} ticket={ticket} />;
                })}
            </div>
        </div>
    );
};

export default CheckoutSuccess;
