import React, { useState, useEffect, createContext, ReactNode } from 'react';

// Define the shape of the user information
export interface IUserInfos {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    refreshToken: string;
    isConnected: boolean;
    state: string;
}

// Create the context with initial values
export const UserInfosContext = createContext<{
    userInfos: IUserInfos;
    setUserInfos: (newUserInfos: Partial<IUserInfos>) => void;
}>({
    userInfos: {} as IUserInfos,
    setUserInfos: () => {},
});

// Define the provider component
const UserInfosProvider = ({ children }: { children: ReactNode }) => {
    // Set the default user information
    const defaultUserInfos: IUserInfos = {
        firstName: "",
        lastName: "",
        email: "",
        token: "",
        refreshToken: "",
        isConnected: false,
        state: "/",
    };

    const [userInfos, setUserInfos] = useState<IUserInfos>(() => {
        const storedUserInfos = sessionStorage.getItem("userInfos");
        if (storedUserInfos) {
            return JSON.parse(storedUserInfos);
        } else {
            return defaultUserInfos;
        }
    });

    // Save user information to session storage on update
    useEffect(() => {
        sessionStorage.setItem("userInfos", JSON.stringify(userInfos));
    }, [userInfos]);

    // setUserInfos function now applies changes to userInfos while keeping the default values intact
    const updateUserInfos = (newUserInfos: Partial<IUserInfos>) => {
        setUserInfos(prevUserInfos => ({
            ...prevUserInfos,
            ...newUserInfos,
        }));
    };

    return (
        <UserInfosContext.Provider value={{ userInfos, setUserInfos: updateUserInfos }}>
            {children}
        </UserInfosContext.Provider>
    );
};

export default UserInfosProvider;