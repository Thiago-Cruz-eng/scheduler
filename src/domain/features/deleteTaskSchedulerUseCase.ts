import { TaskSchedulerRepository } from "@/data/repository/scheduler/taskSchedulerRepository";
import { TaskScheduleData } from "../models/taskScheduleData";
import { TaskScheduleInterface } from "../protocols/taskScheduleInterface";
import { MissingParamError } from "@/presentation/helpers/missingParamError";
import { HttpResponse } from "@/presentation/helpers/httpResponse";

export class DeleteTaskSchedulerUseCase {
    private payload: string
    private repository: TaskScheduleInterface = new TaskSchedulerRepository()
    constructor(payload: string) {
        this.payload = payload;
    }

    async execute(): Promise<any> {
        if (!this.payload) {
          return new MissingParamError('id')
        }

        const deletedSchedule = this.repository.deleteSchedule(this.payload)
        return HttpResponse.goodRequest(deletedSchedule)
    }
}