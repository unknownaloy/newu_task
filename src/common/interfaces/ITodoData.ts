export interface ITodoData {
    id?: string,
    title: string;
    trackingType: "daily" | "weekly";
    daysPerWeek: string[],
    timesPerWeek: number | null,
    streak: number,
    lastStreak: number | null;
    longestStreak: number;
}
