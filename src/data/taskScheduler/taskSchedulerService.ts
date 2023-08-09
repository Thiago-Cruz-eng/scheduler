import { TaskScheduleInterface } from "@/domain/protocols/taskScheduleInterface";

export class TaskSchedulerService implements TaskScheduleInterface {
    public repo: TaskScheduleInterface

    constructor(repository: TaskScheduleInterface) {
        this.repo = repository
    }

    saveSchedule(schedule: any): void {

    }

    getAllSchedule(): void {

    }

    getScheduleByName(name: string): void {

    }

    updateSchedule(id: string, schedule: TaskScheduleInterface): void {

    }

    deleteSchedule(id: any): void {

    }

}