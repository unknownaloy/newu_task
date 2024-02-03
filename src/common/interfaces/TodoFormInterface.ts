export interface TodoFormInterface {
  title: string;
  trackingType: "daily" | "weekly" | "";
  trackingDays?: string[] | null;
  timesPerWeek?: number | null;
  startDate: Date | null;
}