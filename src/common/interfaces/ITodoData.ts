export interface IToDoData {
    id: string,
    title: string;
    trackingType: "daily" | "weekly";
    daysPerWeek: string[],
    timesPerWeek: number | null,
    streak: number,

    // TODO: Add start date
}
