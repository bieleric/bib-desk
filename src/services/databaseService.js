import { useBookStore } from '../stores/bookStore';

const { ipcRenderer } = window;

export const fetchAllBooks = async () => {
    const query = 'SELECT * FROM Buch';
    return ipcRenderer.invoke('execute-query', query).then((result) => {
        return result;
    });
};

export const addNewBook = async (bookID, title, author) => {
    try {
        const query = 'INSERT INTO Buch (Buchnummer, Titel, Autor) VALUES ("' + bookID + '", "' + title + '", "' + author + '");';
        const result = await ipcRenderer.invoke('execute-query', query);

        const bookStore = useBookStore();
        bookStore.addBook({
            Buchnummer: bookID,
            Titel: title,
            Autor: author
        });

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const editBook = async (oldBookID, bookID, title, author) => {
    try {
        const query = 'UPDATE Buch SET Buchnummer = "' + bookID + '", Titel = "' + title + '", Autor = "' + author + '" WHERE Buchnummer = "' + oldBookID + '"';
        const result = await ipcRenderer.invoke('execute-query', query);

        const bookStore = useBookStore();
        bookStore.editBook({
            oldBookID,
            bookID,
            title,
            author
        });

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteBook = async (bookID) => {
    try {
        const query = 'DELETE FROM Buch WHERE Buchnummer = "' + bookID + '"';
        const result = await ipcRenderer.invoke('execute-query', query);

        const bookStore = useBookStore();
        bookStore.deleteBook(bookID);

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};