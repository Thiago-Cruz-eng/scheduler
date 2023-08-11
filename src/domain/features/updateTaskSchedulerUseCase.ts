import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/TaskSchedulerRepository'
import { type TaskScheduleData } from '../models/TaskScheduleData'
import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../presentation/helpers/MissingParamError'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'
import { MissingBodyError } from '../../presentation/helpers/MissingBodyError'

export class UpdateTaskSchedulerUseCase implements BaseUseCase {
  private readonly id: string
  private readonly payload: TaskScheduleData
  private readonly repository: TaskScheduleInterface = new TaskSchedulerRepository()
  constructor (id: string, payload: TaskScheduleData) {
    this.id = id
    this.payload = payload
  }

  async execute (): Promise<any> {
    if (!this.id) {
      return new MissingParamError('id')
    }

    if (!this.payload.name) {
      return new MissingBodyError('name')
    }

    const schedule = await this.repository.updateSchedule(this.id, this.payload)
    return HttpResponse.goodRequest(schedule)
  }
}
