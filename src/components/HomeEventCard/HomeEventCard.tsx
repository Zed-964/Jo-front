import "./HomeEventCard.css";
interface HomeEventCardProps {
    title: string;
    desc1: string;
    desc2: string;
}

const HomeEventCard: React.FC<HomeEventCardProps> = ({
    title,
    desc1,
    desc2,
}) => {
    return (
        <div className="homeEventCard">
            <h1 className="homeEventCard__title">{title}</h1>
            <p className="homeEventCard__p">{desc1}</p>
            <p className="homeEventCard__p">{desc2}</p>
        </div>
    );
};

export default HomeEventCard;
