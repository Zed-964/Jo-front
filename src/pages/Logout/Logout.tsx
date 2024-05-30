import "./Logout.css";
import useUserInfos from "../../hooks/useUserInfos";
import { fetchAPIForLogout } from "../../utils/utils";

const Logout = () => {
    const { userInfos, setUserInfos } = useUserInfos();

    const logout = async () => {
        const status = await fetchAPIForLogout(
            "https://kc-admin.enzolouail.fr/realms/jo-tickets-distribution/protocol/openid-connect/logout",
            userInfos.refreshToken
        );

        if (status === true) {
            setUserInfos({
                isConnected: false,
                token: "",
                refreshToken: "",
                email: "",
                firstName: "",
                lastName: "",
            });

            location.href = "/";
        } else {
            console.error("Error while logging out");
        }
    };

    // logout();

    return (
        <>
            <div className="loader">
                <h2>Etes vous sûr de vous déconnecter? </h2>
                <button onClick={logout}>Se déconnecter</button>
                <a href="/">Retour à l'accueil</a>
            </div>
        </>
    );
};

export default Logout;
