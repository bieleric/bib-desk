const { ipcRenderer } = window;

export const fetchAllBooks = async () => {
    const query = 'SELECT * FROM Buch';
    return ipcRenderer.invoke('execute-query', query).then((result) => {
        return result;
    });
};