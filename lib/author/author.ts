export const getAuthor = async (id : string) => {
    const response = await fetch(`${process.env.API_USER_ENDPOINT}/${id}`);
    return response.json();
};
