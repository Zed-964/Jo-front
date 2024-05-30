import React, { createContext, useState, useEffect } from "react";
import useUserInfos from "../hooks/useUserInfos";
import { decodeJWT } from "../utils/utils";

export interface IUserStatus {
    isAdmin: boolean;
}

export const UserStatusContext = createContext<{
    userStatus: IUserStatus;
    setUserStatus: (newUserStatus: Partial<IUserStatus>) => void;
}>({
    userStatus: { isAdmin: false },
    setUserStatus: () => {},
});

const UserStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const defaultUserStatus: IUserStatus = {
        isAdmin: false,
    };

    const { userInfos } = useUserInfos();

    const [userStatus, setUserStatusState] = useState<IUserStatus>(() => {
        if (userInfos.isConnected && userInfos.token) {
            const token = decodeJWT(userInfos.token);
            const isAdmin =
                token.resource_access?.["tickets-front"]?.roles?.includes(
                    "client-front-admin"
                ) ?? false;
            return { isAdmin };
        } else {
            return defaultUserStatus;
        }
    });

    const setUserStatus = (newUserStatus: Partial<IUserStatus>) => {
        setUserStatusState((prevStatus) => ({
            ...prevStatus,
            ...newUserStatus,
        }));
    };

    useEffect(() => {
        if (userInfos.isConnected && userInfos.token) {
            const token = decodeJWT(userInfos.token);
            const isAdmin =
                token.resource_access?.["tickets-front"]?.roles?.includes(
                    "client-front-admin"
                ) ?? false;
            setUserStatus({ isAdmin });
        } else {
            setUserStatus(defaultUserStatus);
        }

        // console.log("UserStatusProvider: userStatus updated", userStatus);
    }, [userInfos]);

    return (
        <UserStatusContext.Provider value={{ userStatus, setUserStatus }}>
            {children}
        </UserStatusContext.Provider>
    );
};

export default UserStatusProvider;
