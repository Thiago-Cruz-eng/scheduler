import { BaseUseCase } from "@/infra/base/baseUseCase"
import { TaskScheduleInterface } from "../protocols/taskScheduleInterface"
import { TaskScheduleData } from "../models/taskScheduleData"

export class TaskSchedulerUseCase extends BaseUseCase<boolean> {
    //private dataTask: TaskScheduleData

    constructor() {
        super()
    }
    
    validate(): boolean {
        return true
    }

    protected buildUseCase() {

    }
}
