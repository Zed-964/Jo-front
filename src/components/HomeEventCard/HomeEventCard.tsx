import "./HomeEventCard.css";
interface HomeEventCardProps {
    title: string;
    desc1: string;
    desc2: string;
    imgSrc: string;
}

const HomeEventCard: React.FC<HomeEventCardProps> = ({
    title,
    desc1,
    desc2,
    imgSrc,
}) => {
    return (
        <div className="homeEventCard">
            <div className="homeEventCard__title__container">
                <h1 className="homeEventCard__title">{title}</h1>
            </div>
            <img className="homeEventCard__img" src={imgSrc} alt="Illustration"></img>
            <div className="homeEventCard__description__container">
                <p className="homeEventCard__p">{desc1}</p>
                <p className="homeEventCard__p">{desc2}</p>
            </div>
        </div>
    );
};

export default HomeEventCard;
