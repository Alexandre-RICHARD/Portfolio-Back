export const dateGetter = (date: string) => {
    const [
        day,
        month,
        year
    ] = date.split("/");

    const dateObject = new Date(`${year}-${month}-${day}`);

    const formattedYear = dateObject.getFullYear();
    const formattedMonth = String(dateObject.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(dateObject.getDate()).padStart(2, "0");

    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
};
