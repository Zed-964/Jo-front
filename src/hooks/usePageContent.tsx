import { useContext } from "react";
import { PageContentContext } from "../providers/PageContentProvider";

const usePageContent = () => {
    const context = useContext(PageContentContext);

    if (!context) {
        throw new Error(
            "usePageContent must be used within a PageContentProvider"
        );
    }

    return context;
};

export default usePageContent;
