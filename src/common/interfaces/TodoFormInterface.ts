import { IDailyOption } from "./IDailyOption";

export interface TodoFormInterface {
  title: string;
  trackingType: "daily" | "weekly" | "";
  daysPerWeek?: IDailyOption[] | null;
  timesPerWeek?: number | null;
  startDate: Date | null;
}