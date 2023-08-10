import { TaskSchedulerRepository } from "@/data/repository/scheduler/taskSchedulerRepository";
import { TaskScheduleData } from "../models/taskScheduleData";
import { TaskScheduleInterface } from "../protocols/taskScheduleInterface";
import { HttpResponse } from "@/presentation/helpers/httpResponse";
import { MissingParamError } from "@/presentation/helpers/missingParamError";
import { MissingBodyError } from "@/presentation/helpers/missingBodyError";

export class UpdateTaskSchedulerUseCase {
    private id: string
    private payload: TaskScheduleData
    private repository: TaskScheduleInterface = new TaskSchedulerRepository()
    constructor(id: string, payload: TaskScheduleData) {
        this.id = id
        this.payload = payload;
    }

    async execute(): Promise<any> {
        if (!this.id) {
            return new MissingParamError('id');
        }

        if (!this.payload.name) {
            return new MissingBodyError('name');
        }

        const schedule = this.repository.getAllSchedule()
        return HttpResponse.goodRequest(schedule)
    }
}