import "./Logo.css";

const Logo = ({
    src,
    alt,
    width,
    height,
    classes,
}: {
    src: string;
    alt: string;
    width: string;
    height: string;
    classes: string;
}) => {
    const style = {
        width: width,
        height: height,
    };

    return (
        <img src={src} alt={alt} style={style} className={`logo ${classes}`} />
    );
};

export default Logo;
