export interface IToDoData {
    id: string,
    title: string;
    trackingType: "daily" | "weekly";
    daysPerWeek: string[],
    timesPerWeek: number | null,
    streak: 0,

    // TODO: Add start date
}
