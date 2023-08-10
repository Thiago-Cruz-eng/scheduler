import { TaskSchedulerRepository } from "@/data/repository/scheduler/taskSchedulerRepository";
import { TaskScheduleData } from "../models/taskScheduleData";
import { TaskScheduleInterface } from "../protocols/taskScheduleInterface";
import { MissingParamError } from "@/presentation/helpers/missingParamError";
import { HttpResponse } from "@/presentation/helpers/httpResponse";

export class GetTaskSchedulerUseCase {
    private payload?: TaskScheduleData
    private repository: TaskScheduleInterface = new TaskSchedulerRepository()
    constructor(payload?: TaskScheduleData) {
        this.payload = payload;
    }

    async execute(): Promise<any> {
        if (this.payload!.name) {
            const schedule = this.repository.getScheduleByName(this.payload!.name)

            if (!this.payload!.name) return HttpResponse.notFound('no schedule found')
            return HttpResponse.goodRequest(schedule)
        }

        const schedule = this.repository.getAllSchedule()
        return HttpResponse.goodRequest(schedule)
    }
}