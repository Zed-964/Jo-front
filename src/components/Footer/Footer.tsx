import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <a className="footer__link" href="/ToS">CGU</a>
                <a className="footer__link" href="/privacy">Politique de confidentialité</a>
                <a className="footer__link" href="/contact">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;
