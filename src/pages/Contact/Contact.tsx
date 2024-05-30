import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact">
            <h1 className="contact__h1">Contact</h1>
            <p>
                Vous pouvez nous contacter à l'adresse suivante :
                <a href="mailto:enzo.louail@gmail.com">
                    {" "}
                    enzo.louail@gmail.com
                </a>
            </p>
        </div>
    );
};

export default Contact;
