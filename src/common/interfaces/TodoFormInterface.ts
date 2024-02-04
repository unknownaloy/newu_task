import { IDailyOption } from "./IDailyOption";

export interface TodoFormInterface {
  title: string;
  trackingType: "daily" | "weekly" | "";
  daysPerWeek?: IDailyOption[] | null;
  timesPerWeek: number | "";
  startDate: Date | null;
}