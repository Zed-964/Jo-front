import './ProfileSelector.css'

interface ProfileSelectorProps {
    isConnected: boolean;
}


const ProfileSelector:React.FC<ProfileSelectorProps> = ({isConnected}) => {
    return (
        <div className="profile__selector">
            <h1>Profile Selector</h1>
        </div>
    );
};

export default ProfileSelector;