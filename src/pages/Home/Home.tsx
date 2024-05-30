import "./Home.css";
import HomeEventCard from "../../components/HomeEventCard/HomeEventCard";
import useBasketContent from "../../hooks/useBasketContent";

const Home = () => {
    // const { basketContent, setBasketContent } = useBasketContent();
    const { basketContent } = useBasketContent();

    const card1 = {
        title: "Athlétisme – 100 mètres hommes",
        desc1: "Découvrez l'épreuve reine des Jeux Olympiques : le 100 mètres hommes, une course où la puissance et la rapidité sont à l'honneur. Assistez à une compétition épique qui décide de l'homme le plus rapide.",
        desc2: "Cette épreuve iconique ne se contente pas de tester la vitesse pure; elle est un véritable spectacle de force, d'agilité, et de technique parfaitement maîtrisée. Ne manquez pas l'occasion de vivre cette course légendaire en direct!",
    };

    const card2 = {
        title: "Gymnastique artistique – Concours général individuel femmes",
        desc1: "La gymnastique artistique féminine est une symphonie de grâce, d'agilité et de précision. Le concours général individuel rassemble les meilleures gymnastes du monde dans une lutte pour la perfection.",
        desc2: "Chaque épreuve est une démonstration de contrôle et d'expression artistique, où chaque mouvement compte. Le suspense est à son comble alors que ces athlètes d'exception poussent les limites de la coordination et de la force physique.",
    };

    const card3 = {
        title: "Natation – 200 mètres papillon hommes",
        desc1: "Le 200 mètres papillon est l'une des épreuves les plus exigeantes et spectaculaires de la natation. Cette course teste non seulement la vitesse des nageurs, mais aussi leur endurance et leur technique dans l'une des nages les plus difficiles.",
        desc2: "Dans cette compétition où chaque seconde est cruciale, la stratégie de course peut faire toute la différence. Participez à cette chance unique de voir des athlètes au sommet de leur forme, luttant pour l'or dans un ballet aquatique de haute intensité.",
    };

    return (
        <div className="home__container">
            <h1 className="home__title">Événements à ne pas manquer</h1>
            <div className="home__underline"></div>
            <div className="home__card__container">
                <HomeEventCard
                    title={card1.title}
                    desc1={card1.desc1}
                    desc2={card1.desc2}
                />
                <HomeEventCard
                    title={card2.title}
                    desc1={card2.desc1}
                    desc2={card2.desc2}
                />
                <HomeEventCard
                    title={card3.title}
                    desc1={card3.desc1}
                    desc2={card3.desc2}
                />
            </div>
            <a href="/ticketing" className="home__button">
                Réservez vos billets
            </a>
        </div>
    );
};

export default Home;
