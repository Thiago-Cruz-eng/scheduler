import TaskSchedulerRepository  from "../../data/taskScheduler/repository/scheduler/taskSchedulerRepository";
import { TaskScheduleData } from "../../domain/models/taskScheduleData";
import { TaskScheduleInterface } from "../../domain/protocols/taskScheduleInterface";
import { HttpResponse } from "../../presentation/helpers/httpResponse";
import { MissingParamError } from "../../presentation/helpers/missingParamError";
import { MissingBodyError } from "../../presentation/helpers/missingBodyError";
import { BaseUseCase } from "../../infra/base/baseUseCase";

export class UpdateTaskSchedulerUseCase implements BaseUseCase {
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

        const schedule = await this.repository.updateSchedule(this.id, this.payload)
        return HttpResponse.goodRequest(schedule)
    }
}