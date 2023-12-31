import { type TaskScheduleData } from '../models/TaskScheduleData'
export interface TaskScheduleInterface {
  saveSchedule(schedule: TaskScheduleData): object
  getAllSchedule(): object
  getScheduleByName(name: string): object
  updateSchedule(id: string, schedule: TaskScheduleData): object
  deleteSchedule(id: string): object
  getFilterSchedulerByDate(): any
  updateApiReturn (id: string, returnOf: string, date: Date): object
}
