import TaskSchedulerRepository from "@/data/repository/scheduler/taskSchedulerRepository";
import { TaskScheduleData } from "@/domain/models/taskScheduleData";
import { TaskScheduleInterface } from "@/domain/protocols/taskScheduleInterface";
import { HttpResponse } from "@/presentation/helpers/httpResponse";
import { BaseUseCase } from "@/infra/base/baseUseCase";

export class GetTaskSchedulerUseCase implements BaseUseCase {
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