import { type TaskScheduleData } from '../../domain/models/taskScheduleData'
export interface TaskScheduleInterface {
  saveSchedule(schedule: TaskScheduleData): any
  getAllSchedule(): any
  getScheduleByName(name: string): any
  updateSchedule(id: string, schedule: TaskScheduleData): any
  deleteSchedule(id: string): any
  getFilterSchedulerByDate(): any
}
