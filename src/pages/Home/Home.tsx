import "./Home.css";
import HomeEventCard from "../../components/HomeEventCard/HomeEventCard";

const Home = () => {
    // const url = window.location.href;
    // const contentAfterDomain = url.substring(
    //     url.indexOf("https://enzolouail.fr") + "https://enzolouail.fr".length
    // );
    // if (contentAfterDomain !== "/") {
    //     window.location.href = "https://enzolouail.fr";
    // }

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

    const card4 = {
        title: "Basketball – Tournoi masculin",
        desc1: "Le tournoi de basketball masculin des Jeux Olympiques réunit les meilleures équipes du monde, offrant des confrontations intenses et passionnantes. Assistez à des matchs où la stratégie, la vitesse et l'adresse sont essentielles pour atteindre la victoire.",
        desc2: "Chaque rencontre est une démonstration de jeu d'équipe et de compétences individuelles hors du commun, avec des dunks spectaculaires, des tirs à trois points décisifs et une défense acharnée. Venez vibrer au rythme des dribbles et des acclamations, et soutenez vos équipes préférées sur la route vers la médaille d'or.",
    };

    const card5 = {
        title: "Cyclisme sur piste – Vitesse par équipes hommes",
        desc1: "La vitesse par équipes est une épreuve de cyclisme sur piste qui allie vitesse, puissance et coordination. Les équipes s'affrontent sur un circuit ovale à couper le souffle, se relayant pour atteindre des vitesses vertigineuses.",
        desc2: "Chaque équipe doit trouver le parfait équilibre entre la force brute et la stratégie pour remporter la victoire. Plongez dans l'atmosphère électrique du vélodrome et vivez l'excitation des sprints finaux où chaque coup de pédale compte.",
    };

    const card6 = {
        title: "Football – Finale féminine",
        desc1: "La finale féminine de football des Jeux Olympiques est un événement incontournable qui met en lumière le talent et la détermination des meilleures joueuses du monde. Assistez à un match où la passion, l'engagement et le fair-play sont à l'honneur.",
        desc2: "Les équipes finalistes s'affrontent pour décrocher l'or olympique dans une rencontre intense et émouvante. Venez encourager ces athlètes exceptionnelles et vivez des moments de football d'exception qui resteront gravés dans l'histoire.",
    };

    return (
        <div className="home__container">
            <div className="home__intro">
                <h1 className="home__title home__intro__title">
                    Bienvenue à la billeterie des Jeux Olympiques de Paris 2024
                </h1>
                <p className="home__intro__text">
                    Les Jeux Olympiques d'été de 2024, officiellement connus
                    sous le nom de Jeux de la XXXIIIe Olympiade, se tiendront à
                    Paris, France, du 26 juillet au 11 août 2024. Cet événement
                    prestigieux réunira des athlètes du monde entier qui
                    s'affronteront dans diverses disciplines sportives, allant
                    de l'athlétisme à la natation, en passant par le cyclisme et
                    le football. Paris, qui accueille les Jeux Olympiques pour
                    la troisième fois, promet des compétitions exaltantes, des
                    infrastructures modernes et une célébration de la diversité
                    et de l'unité mondiale. Les Jeux de 2024 mettent également
                    un accent particulier sur la durabilité et l'innovation,
                    visant à laisser un héritage positif tant sur le plan
                    environnemental que social.
                </p>
                <p className="home__intro__text">
                    Bienvenue sur notre site de vente de billets pour les Jeux
                    Olympiques de Paris 2024 ! Réservez dès maintenant vos
                    places pour assister à des moments inoubliables et soutenir
                    vos athlètes favoris dans des compétitions palpitantes. Ne
                    manquez pas cette occasion unique de vivre l'expérience
                    olympique en direct !
                </p>
            </div>

            <h1 className="home__title">Événements à ne pas manquer</h1>
            <div className="home__underline"></div>
            <div className="home__card__container">
                <HomeEventCard
                    title={card1.title}
                    desc1={card1.desc1}
                    desc2={card1.desc2}
                    imgSrc="/assets/img/home/athletisme.jpeg"
                />
                <HomeEventCard
                    title={card2.title}
                    desc1={card2.desc1}
                    desc2={card2.desc2}
                    imgSrc="/assets/img/home/gym.jpg"
                />
                <HomeEventCard
                    title={card3.title}
                    desc1={card3.desc1}
                    desc2={card3.desc2}
                    imgSrc="/assets/img/home/natation.jpg"
                />
                <HomeEventCard
                    title={card4.title}
                    desc1={card4.desc1}
                    desc2={card4.desc2}
                    imgSrc="/assets/img/home/basket.jpeg"
                />
                <HomeEventCard
                    title={card5.title}
                    desc1={card5.desc1}
                    desc2={card5.desc2}
                    imgSrc="/assets/img/home/cyclisme.jpeg"
                />
                <HomeEventCard
                    title={card6.title}
                    desc1={card6.desc1}
                    desc2={card6.desc2}
                    imgSrc="/assets/img/home/football.jpg"
                />
            </div>
            <a href="/ticketing" className="home__button">
                Réservez vos billets
            </a>
        </div>
    );
};

export default Home;
