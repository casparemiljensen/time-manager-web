import { DatePipe } from "@angular/common";

export interface Timeregistrations {
  id: number;
  startTime: DatePipe;
  endTime: DatePipe;
  employeeId: number;
  location: number;
}
