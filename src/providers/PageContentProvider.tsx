import React, { useState, createContext, useEffect } from "react";

interface PageContent {
    [key: string]: any;
}

interface PageContentContextType {
    pageContent: PageContent;
    setPageContent: React.Dispatch<React.SetStateAction<PageContent>>;
}

export const PageContentContext = createContext<PageContentContextType>({
    pageContent: {},
    setPageContent: () => {},
});

const PageContentProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [pageContent, setPageContent] = useState<PageContent>({});

    useEffect(() => {
        fetch("/data/pageContent.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch page content JSON file.");
                }
                return response.json();
            })
            .then((data: PageContent) => setPageContent(data))
            .catch((error) =>
                console.error("Error fetching page content: ", error)
            );
    }, []);

    return (
        <PageContentContext.Provider value={{ pageContent, setPageContent }}>
            {children}
        </PageContentContext.Provider>
    );
};

export default PageContentProvider;
