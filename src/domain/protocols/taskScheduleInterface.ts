import {TaskScheduleData} from "../../domain/models/taskScheduleData"
export interface TaskScheduleInterface {
    saveSchedule(schedule: TaskScheduleData): object
    getAllSchedule(): object
    getScheduleByName(name: string): object
    updateSchedule(id: string, schedule: TaskScheduleData): object
    deleteSchedule(id: string): object
}