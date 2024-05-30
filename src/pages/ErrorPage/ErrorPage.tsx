import './ErrorPage.css'

const ErrorPage = () => {

    setTimeout(() => {
        window.location.href = "https://enzolouail.fr";
    }, 1500);

    return (
        <div className="error">
            <h1>Erreur: Page non reconnue. Redirection en cours.</h1>
        </div>
    );
};

export default ErrorPage;