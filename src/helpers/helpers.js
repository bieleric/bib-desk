export const getCurrentDateFormatted = () => {
    const today = new Date();
    const todayFormatted = formatDateToTTMMJJJJ(today);

    return todayFormatted;
}

export const getDateInTwoWeeksFormatted = () => {
    const today = new Date();
    let twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);
    const twoWeeksLaterFormatted = formatDateToTTMMJJJJ(twoWeeksLater);

    return twoWeeksLaterFormatted;
}

const formatDateToTTMMJJJJ = (date) => {
    let tag = String(date.getDate()).padStart(2, '0');
    let monat = String(date.getMonth() + 1).padStart(2, '0');
    let jahr = date.getFullYear();
    return `${tag}.${monat}.${jahr}`;
}

export const stringToDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    return new Date(year, month - 1, day);
}