export const getCurrentDate = () : string => {
    const today = new Date();

    const options = <Intl.DateTimeFormatOptions>{
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const formattedDate = today.toLocaleDateString("en-uk", options);

    return formattedDate;
};