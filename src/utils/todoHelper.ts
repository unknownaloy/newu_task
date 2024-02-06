/**
 * Rearranges an array of days of the week in the order from Monday to Sunday.
 *
 * @param {string[]} selectedDays - The array of selected days of the week.
 * @returns {string[]} The arranged array of days from Monday to Sunday.
 */
export const arrangeDaysOfWeek = (selectedDays: string[]): string[] => {

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    let pointer = 0;

    const result: string[] = [];

    while (pointer < daysOfWeek.length) {
        const day = daysOfWeek[pointer];
        for (const item of selectedDays) {
            if (item === day) {
                result.push(item);
            }
        }
        pointer++;
    }

    return result;
}



/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} value - The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}