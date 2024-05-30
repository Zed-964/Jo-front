import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import useUserInfos from "../../hooks/useUserInfos";
import { IUserInfos } from "../../providers/UserInfosProvider";
import { fetchAPIForToken, decodeJWT } from "../../utils/utils";
import useJwt from "react-jwt";

export interface IJWTReturn {
    decodedToken: IDecodedToken | null;
    isExpired: boolean | null;
}

export interface IDecodedToken {
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    acr: string;
    allowed_origins: string[];
    realm_access: {
        roles: string[];
    };
    resource_access: {
        account: {
            roles: string[];
        };
    };
    scope: string;
    sid: string;
    email_verified: boolean;
    preferred_username: string;
    given_name: string;
    family_name: string;
    email: string;
}

export interface LoginProps {
    state: string;
}

const Login: React.FC<LoginProps> = ({ state }) => {
    const params = new URLSearchParams(window.location.search);
    const allparams = Object.fromEntries(params);

    const { userInfos, setUserInfos } = useUserInfos();

    const getDataFromSession = (key: string): IUserInfos | null => {
        const data = sessionStorage.getItem(key);
        if (!data) {
            return null;
        }
        try {
            const parsedData: IUserInfos = JSON.parse(data);
            return parsedData;
        } catch (e) {
            console.error("Error while parsing JSON", e);
            return null;
        }
    };

    const sessionUserInfos = getDataFromSession("userInfos");

    const checkIfConnected = () => {
        if (sessionUserInfos?.isConnected && sessionUserInfos?.state) {
            //redirects to the right page if the user is already connected and tries to connect again
            const sessionUsersInfosState = sessionUserInfos.state;
            if (sessionUsersInfosState === "basket") {
                location.href = "/basket";
            } else if (sessionUsersInfosState === "profile") {
                location.href = "/profile";
            } else {
                location.href = "/";
            }
        }
    };

    const fetchData = async (): Promise<void> => {
        if (allparams.code && allparams.iss && allparams.session_state) {
            try {
                const tokenAPICall = await fetchAPIForToken(
                    "https://kc-admin.enzolouail.fr/realms/jo-tickets-distribution/protocol/openid-connect/token", //!Prod
                    // "https://kc-admin.kalipto.dev/realms/MANGEMORT/protocol/openid-connect/token", //!Test Local
                    "POST",
                    allparams.code,
                    "authorization_code"
                );

                console.warn("TokenAPICall:", tokenAPICall);

                // const decodedToken = decodeJWT(tokenAPICall.access_token);
                const decodedToken: IDecodedToken = decodeJWT(
                    tokenAPICall.access_token
                );

                // console.warn("DecodedToken:", decodedToken);

                if (decodedToken != null) {
                    const userInfos = {
                        firstName: decodedToken.given_name,
                        lastName: decodedToken.family_name,
                        email: decodedToken.email,
                    };

                    console.warn("UserInfos:", userInfos);

                    setUserInfos({
                        ...userInfos,
                        token: tokenAPICall.access_token,
                        refreshToken: tokenAPICall.refresh_token,
                        isConnected: true,
                        state: allparams.state,
                    });

                    if (allparams.state === "basket") {
                        location.href = "/basket";
                    } else if (allparams.state === "profile") {
                        location.href = "/profile";
                        // } else {
                        //     location.href = "/"; //!TEMP
                    } else {
                        location.href = "/";
                    }
                } else {
                    console.error("Error while decoding token");
                }
            } catch (error) {
                console.error("Error while fetching token:", error);
            }
        } else {
            console.log("Not connected");
        }
    };

    useEffect(() => {
        checkIfConnected();
        if (window.location.href.indexOf("result") > -1) {
            fetchData();
        } else {
            location.href = `https://kc-admin.enzolouail.fr/realms/jo-tickets-distribution/protocol/openid-connect/auth?client_id=tickets-front&redirect_uri=https%3A%2F%2Fenzolouail.fr%2Flogin%2Fresult&response_type=code&scope=openid&state=${state}`;
        }
    }, []);

    useEffect(() => {
        checkIfConnected();
    }, [userInfos]);

    return (
        <div>
            <h1>Connexion en cours.</h1>
        </div>
    );
};

export default Login;
