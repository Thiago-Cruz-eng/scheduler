import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/TaskSchedulerRepository'
import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'
import { MissingParamError } from '../../presentation/helpers/MissingParamError'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'

export class DeleteTaskSchedulerUseCase implements BaseUseCase {
  private readonly payload: string
  private readonly repository: TaskScheduleInterface = new TaskSchedulerRepository()
  constructor (payload: string) {
    this.payload = payload
  }

  async execute (): Promise<any> {
    if (!this.payload) {
      return new MissingParamError('id')
    }
    const deletedSchedule = await this.repository.deleteSchedule(this.payload)
    return HttpResponse.goodRequest(deletedSchedule)
  }
}
