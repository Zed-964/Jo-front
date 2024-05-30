import "./ProfileSelector.css";
// import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { MdPersonOutline } from "react-icons/md";
import useUserInfos from "../../hooks/useUserInfos";

const ProfileSelector: React.FC = () => {
    const { userInfos } = useUserInfos();

    const isConnected = userInfos?.isConnected;

    return (
        <div
            className="profile__selector__container"
            onClick={() => {
                window.location.href = "/profile";
            }}
        >
            {isConnected ? (
                <div className="profile__selector__connected">
                    <div className="profile__selector__connected__text">
                        <span>
                            {userInfos?.firstName.charAt(0).toUpperCase() +
                                userInfos?.lastName.charAt(0).toUpperCase()}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="profile__selector__disconnected">
                    <div className="profile__selector__disconnected__text">
                        <IconContext.Provider
                            value={{ className: "profile__selector__icon" }}
                        >
                            <MdPersonOutline />
                        </IconContext.Provider>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSelector;
