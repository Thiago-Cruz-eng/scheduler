import { TaskScheduleData } from '../../domain/models/TaskScheduleData'
import { BaseMapper } from '../../infra/base/BaseMapper'
import { type TaskSchedulerRequest } from '../protocols/request/TaskSchedulerRequest'

export class TaskSchedulerMapper extends BaseMapper<TaskSchedulerRequest, TaskScheduleData> {
  dataToModel (data: TaskSchedulerRequest): TaskScheduleData {
    const model = new TaskScheduleData(data.name, data.description)
    model.name = data.name
    model.description = data.description
    model.dateSchedule = data.dateSchedule
    return model
  }

  modelToData (model: TaskScheduleData): TaskSchedulerRequest {
    const data = new TaskScheduleData(model.name, model.description)
    data.name = model.name
    data.description = model.description
    data.dateSchedule = model.dateSchedule

    return data
  }
}
