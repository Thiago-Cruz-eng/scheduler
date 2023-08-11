import { MissingParamError } from '../../presentation/helpers/MissingParamError'
import { type TaskScheduleData } from '../../domain/models/taskScheduleData'
import { type TaskScheduleInterface } from '../../domain/protocols/taskScheduleInterface'
import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/taskSchedulerRepository'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/baseUseCase'

export class CreateTaskSchedulerUseCase implements BaseUseCase {
  private readonly payload: TaskScheduleData
  private readonly repository: TaskScheduleInterface = new TaskSchedulerRepository()
  constructor (payload: TaskScheduleData) {
    this.payload = payload
  }

  async execute (): Promise<any> {
    if (!this.payload.name) {
      return new MissingParamError('name')
    }

    const newSchedule = await this.repository.saveSchedule(this.payload)
    return HttpResponse.goodRequest(newSchedule)
  }
}
