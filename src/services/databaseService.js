import { useBookStore } from '../stores/bookStore';
import { useCustomerStore } from '../stores/customerStore';
import { useRentalStore } from '../stores/rentalStore';

const { ipcRenderer } = window;

export const fetchAllBooks = async () => {
    const query = 'SELECT * FROM Buch';
    return ipcRenderer.invoke('execute-query', query).then((result) => {
        return result;
    });
};

export const fetchAllCustomers = async () => {
    const query = 'SELECT * FROM Kunden';
    return ipcRenderer.invoke('execute-query', query).then((result) => {
        return result;
    });
};

export const fetchAllRentals = async () => {
    const query = 'SELECT * FROM Verleih';
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

export const addNewCustomer = async (kunID, firstname, lastname) => {
    try {
        const query = 'INSERT INTO Kunden (KunID, Name, Vorname) VALUES ("' + kunID + '", "' + lastname + '", "' + firstname + '");';
        const result = await ipcRenderer.invoke('execute-query', query);

        const customerStore = useCustomerStore();
        customerStore.addCustomer({
            KunID: kunID,
            Name: lastname,
            Vorname: firstname
        });

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const addNewRental = async (kunID, firstname, lastname, bookID, author, title, rentalDate, returnDate) => {
    try {
        const query = 'INSERT INTO Verleih (KunID, Name, Vorname, Buchnummer, Autor, Titel, Ausleihe, Rueckgabe) VALUES ("' + kunID + '", "' + lastname + '", "' + firstname + '", "' + bookID + '", "' + author + '", "' + title + '", "' + rentalDate + '", "' + returnDate + '");';

        const result = await ipcRenderer.invoke('execute-query', query);

        const rentalStore = useRentalStore();
        rentalStore.addRental({
            KunID: kunID,
            Name: lastname,
            Vorname: firstname,
            Buchnummer: bookID,
            Autor: author,
            Titel: title,
            Ausleihe: rentalDate,
            Rueckgabe: returnDate
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

export const editCustomer = async (oldKunID, kunID, lastname, firstname) => {
    try {
        const query = 'UPDATE Kunden SET KunID = "' + kunID + '", Name = "' + lastname + '", Vorname = "' + firstname + '" WHERE KunID = "' + oldKunID + '"';
        const result = await ipcRenderer.invoke('execute-query', query);

        const customerStore = useCustomerStore();
        customerStore.editCustomer({
            oldKunID,
            kunID,
            lastname,
            firstname
        });

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const editRental = async (oldKunID, oldBookID, selectedBook, selectedCustomer, rentalDate, returnDate) => {
    try {
        const query = 'UPDATE Verleih SET KunID = "' + selectedCustomer.KunID + '", Name = "' + selectedCustomer.Name + '", Vorname = "' + selectedCustomer.Vorname + '", Buchnummer = "' + selectedBook.Buchnummer + '", Autor = "' + selectedBook.Autor + '", Titel = "' + selectedBook.Titel + '", Ausleihe = "' + rentalDate + '", Rueckgabe = "' + returnDate + '" WHERE KunID = "' + oldKunID + '" AND Buchnummer = "' + oldBookID + '"';

        const result = await ipcRenderer.invoke('execute-query', query);

        const rentalStore = useRentalStore();
        rentalStore.editRental({
            oldKunID,
            oldBookID,
            selectedBook,
            selectedCustomer,
            rentalDate,
            returnDate
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

export const deleteCustomer = async (kunID) => {
    try {
        const query = 'DELETE FROM Kunden WHERE KunID = "' + kunID + '"';
        const result = await ipcRenderer.invoke('execute-query', query);

        const customerStore = useCustomerStore();
        customerStore.deleteCustomer(kunID);

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteRental = async (kunID, bookID) => {
    try {
        const query = 'DELETE FROM Verleih WHERE KunID = "' + kunID + '" AND Buchnummer = "' + bookID + '"';
        const result = await ipcRenderer.invoke('execute-query', query);

        const rentalStore = useRentalStore();
        rentalStore.deleteRental(kunID, bookID);

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};