import {TaskScheduleData} from '@/domain/models/taskScheduleData'
export interface TaskScheduleInterface {
    saveSchedule(schedule: TaskScheduleData): void
    getAllSchedule(): void
    getScheduleByName(name: string): void
    updateSchedule(id: string, schedule: TaskScheduleInterface): void
    deleteSchedule(id: string): void
}