import { useEffect, useState, useRef } from "react";
import { fetchAPIForRefreshToken, fetchAPIForLogout } from "../utils/utils";
import useUserInfos from "./useUserInfos";

interface TokenData {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

const REFRESH_INTERVAL = 4 * 60 * 1000; // Refresh token every 4 minutes
const API_URL =
    "https://kc-admin.enzolouail.fr/realms/jo-tickets-distribution/protocol/openid-connect/token";

const useTokenRefresh = () => {
    const [tokenData, setTokenData] = useState<TokenData | null>(null);
    const { userInfos, setUserInfos } = useUserInfos();
    const refreshTokenRef = useRef(userInfos.refreshToken);
    let refreshTimer: NodeJS.Timeout | null = null; // Declare refreshTimer here

    // Update the ref whenever userInfos.refreshToken changes
    useEffect(() => {
        refreshTokenRef.current = userInfos.refreshToken;
    }, [userInfos.refreshToken]);

    useEffect(() => {
        // Function to refresh token and restart timer
        const refreshTokenAndRestartTimer = async () => {
            try {
                const response = await fetchAPIForRefreshToken(
                    API_URL,
                    "POST",
                    refreshTokenRef.current
                );
                if (
                    typeof response === "object" &&
                    response !== null &&
                    "access_token" in response &&
                    "expires_in" in response &&
                    "refresh_token" in response
                ) {
                    setTokenData(response);
                    setUserInfos({
                        ...userInfos,
                        token: response.access_token,
                        refreshToken: response.refresh_token,
                    });
                } else {
                    // console.warn(response);
                    // Handle error response if needed
                    console.error(
                        "Failed to refresh token:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
                alert(
                    "Vous avez été déconnecté suite à une erreur. Veuillez vous reconnecter."
                );

                setUserInfos({
                    isConnected: false,
                    token: "",
                    refreshToken: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                });

                fetchAPIForLogout(
                    "https://kc-admin.enzolouail.fr/realms/jo-tickets-distribution/protocol/openid-connect/logout",
                    userInfos.refreshToken
                );

                window.location.href = "/";
                // Handle network or other errors if needed
            }

            // Restart the timer after each refresh
            refreshTimer = setTimeout(
                refreshTokenAndRestartTimer,
                REFRESH_INTERVAL
            );
        };

        // Start the timer only if there's a refresh token and the timer hasn't been started yet
        if (userInfos.refreshToken && !refreshTimer) {
            refreshTokenAndRestartTimer();
        }

        // Cleanup function to clear interval on component unmount
        return () => {
            if (refreshTimer) clearTimeout(refreshTimer);
        };
        // Empty dependency array to run the effect only on mount
    }, []);

    return tokenData;
};

export default useTokenRefresh;
