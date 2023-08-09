import { BaseUseCase } from "@/infra/base/baseUseCase"
import { TaskScheduleInterface } from "../protocols/taskScheduleInterface"
import { TaskScheduleData } from "../models/taskScheduleData"

export class TaskSchedulerUseCase extends BaseUseCase<boolean> {
    private dataTask: TaskScheduleData

    constructor() {
        const dataTask = this.dataTask
        super()
    }
    
    validate(): boolean {
        return true
    }

    protected buildUseCase() {
        if(!this.dataTask) {
            return badRequest(new MissingDataError())
        }
        return this.service.cancelEmail(this.cancelData)
    }
}
