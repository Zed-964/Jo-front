import "./Profile.css";
import useUserInfos from "../../hooks/useUserInfos";
import Login from "../Login/Login";
import { Navigate } from "react-router-dom";
import useUserStatus from "../../hooks/useUserStatus";
import { useEffect, useState } from "react";
import { CheckoutObject, fetchAPIWithToken } from "../../utils/utils";
import BoughtTicket from "../../components/BoughtTicket/BoughtTicket";

const Profile = () => {
    const { userInfos } = useUserInfos();
    const { userStatus } = useUserStatus();

    const [tickets, setTickets] = useState<CheckoutObject[]>([]);

    let isDisconnecting = false;

    const fetchAPI = async () => {
        try {
            const response = await fetchAPIWithToken(
                "https://api.enzolouail.fr/api/v1/tickets/me",
                "GET",
                userInfos.token || ""
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const initTickets = async () => {
        const response = await fetchAPI();
        if (
            response.data !== undefined &&
            response.data !== null &&
            response.data !== "" &&
            response.data?.length > 0
        ) {
            setTickets(response.data);
        }
    };

    const handleDisconnect = () => {
        isDisconnecting = true;
        window.location.replace("https://enzolouail.fr/logout");
    };

    useEffect(() => {
        if (userInfos.isConnected) {
            initTickets();
        }
    }, []);

    // window.location.href = "https://kc-admin.enzolouail.fr/auth/realms/jo-tickets-distribution/protocol/openid-connect/logout?redirect_uri=https://enzolouail.fr"

    if (userInfos.isConnected) {
        return (
            <div className="profile">
                <h1 className="profile__title">Profil</h1>
                <div className="profile__infos">
                    <div className="profile__infos__name">
                        <div className="profile__infos__firstName profile__div__container">
                            <h2 className="profile__infos__firstName__h2 profile__h2">
                                Prénom
                            </h2>
                            <span className="profile__infos__firstName__span profile__span">
                                {userInfos.firstName}
                            </span>
                        </div>

                        <div className="profile__infos__lastName profile__div__container">
                            <h2 className="profile__infos__lastName__h2 profile__h2">
                                Nom
                            </h2>
                            <span className="profile__infos__lastName__span profile__span">
                                {userInfos.lastName}
                            </span>
                        </div>
                    </div>

                    <div className="profile__infos__email__container">
                        <div className="profile__infos__email profile__div__container">
                            <h2 className="profile__infos__email__h2 profile__h2">
                                Email
                            </h2>
                            <span className="profile__infos__email__span profile__span">
                                {userInfos.email}
                            </span>
                        </div>
                    </div>

                    {userStatus.isAdmin && (
                        <div className="profile__infos__admin__container">
                            <div className="profile__infos__admin profile__div__container">
                                <h2 className="profile__infos__admin__h2 profile__h2">
                                    Statut
                                </h2>
                                <span className="profile__infos__admin__span profile__span">
                                    Administrateur
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="profile__buttons">
                    {userStatus.isAdmin && (
                        <button
                            className="profile__button profile__buttons__admin"
                            onClick={() =>
                                window.location.replace(
                                    "https://enzolouail.fr/admin"
                                )
                            }
                        >
                            Panneau Administrateur
                        </button>
                    )}
                    <button
                        className="profile__buttons__disconnect profile__button"
                        onClick={handleDisconnect}
                    >
                        Se déconnecter
                    </button>
                </div>

                {tickets.length > 0 && (
                    <div className="profile__tickets">
                        <h2 className="profile__tickets__title">
                            Vos billets:
                        </h2>
                        <div className="profile__tickets__ul">
                            {tickets.map((ticket: any) => {
                                return (
                                    <BoughtTicket
                                        key={ticket.uuid}
                                        ticket={ticket}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    } else if (isDisconnecting) {
        return <Navigate to="/" replace={true} />;
    } else {
        return <Login state="profile" />;
    }

    // }
};

export default Profile;
