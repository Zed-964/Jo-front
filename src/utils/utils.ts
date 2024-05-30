export const fetchLocalFiles = async (path: string) => {
    const response = await fetch(path);
    const data = await response.json();
    console.log(data);

    return data;
};
