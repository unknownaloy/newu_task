import dayjs from "dayjs";

export const getCurrentDate = (): string => {
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

/**
 * Returns the day of the week in lowercase for a given date.
 *
 * @param date - The input date.
 * @returns The day of the week in lowercase.
 */
export const getDayOfWeekFromDate = (date: Date): string => {
    return dayjs(date).format('dddd').toLowerCase();
}

/**
 * Returns the difference in days between two dates.
 *
 * @param endDate - The end date.
 * @param startDate - The start date.
 * @returns The difference in days between endDate and startDate.
 */
export const subtractDates = (endDate: Date, startDate: Date): number => {
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays;
};


/**
 * Checks if two dates represent the same day based on the year, date, and month.
 *
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} True if the dates are the same day; otherwise, false.
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth();
}