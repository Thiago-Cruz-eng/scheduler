import { MissingParamError } from "@/presentation/helpers/missingParamError";
import { TaskScheduleData } from "../models/taskScheduleData";
import { TaskScheduleInterface } from "@/domain/protocols/taskScheduleInterface";
import { TaskSchedulerRepository } from "@/data/repository/scheduler/taskSchedulerRepository";
import { HttpResponse } from "@/presentation/helpers/httpResponse";

export class CreateTaskSchedulerUseCase {
    private payload: TaskScheduleData
    private repository: TaskScheduleInterface = new TaskSchedulerRepository()
    constructor(payload: TaskScheduleData) {
        this.payload = payload;
    }

    async execute(): Promise<any> {
        if (!this.payload.name) {
          return new MissingParamError('name')
        }

        const newSchedule = this.repository.saveSchedule(this.payload)
        return HttpResponse.goodRequest(newSchedule)
    }
}