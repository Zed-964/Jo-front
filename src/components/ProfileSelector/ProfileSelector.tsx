import "./ProfileSelector.css";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";

interface ProfileSelectorProps {
    isConnected: boolean;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ isConnected }) => {
    return (
        <div className="profile__selector__container">
            {isConnected ? (
                <div className="profile__selector__connected">
                    <div className="profile__selector__connected__text">
                        <span>BA</span>
                    </div>
                </div>
            ) : (
                <div className="profile__selector__disconnected">
                    <div className="profile__selector__disconnected__text">
                        <IconContext.Provider
                            value={{ className: "profile__selector__icon" }}
                        >
                            <CgProfile />
                        </IconContext.Provider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSelector;
