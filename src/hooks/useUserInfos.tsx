import { useContext } from "react";
import { UserInfosContext } from "../providers/UserInfosProvider";

const useUserInfos = () => {
    const context = useContext(UserInfosContext);

    if (!context) {
        throw new Error("useUserInfos must be used within a UserInfosProvider");
    }

    return context;
}

export default useUserInfos;