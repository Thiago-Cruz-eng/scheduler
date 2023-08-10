import { MissingParamError } from "@/presentation/helpers/missingParamError";
import { TaskScheduleData } from "@/domain/models/taskScheduleData";
import { TaskScheduleInterface } from "@/domain/protocols/taskScheduleInterface";
import TaskSchedulerRepository  from "@/data/repository/scheduler/taskSchedulerRepository";
import { HttpResponse } from "@/presentation/helpers/httpResponse";
import { BaseUseCase } from "@/infra/base/baseUseCase";

export class CreateTaskSchedulerUseCase implements BaseUseCase {
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