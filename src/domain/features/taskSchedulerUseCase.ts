import { BaseUseCase } from "@/infra/base/baseUseCase"

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
