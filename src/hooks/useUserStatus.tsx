import { useContext } from "react";
import { UserStatusContext } from "../providers/UserStatusProvider";

const useUserStatus = () => {
    const context = useContext(UserStatusContext);

    if (!context) {
        throw new Error(
            "useUserStatus must be used within a UserStatusProvider"
        );
    }

    return context;
};

export default useUserStatus;
