import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/taskSchedulerRepository'
import { type TaskScheduleInterface } from '../../domain/protocols/taskScheduleInterface'
import { MissingParamError } from '../../presentation/helpers/missingParamError'
import { HttpResponse } from '../../presentation/helpers/httpResponse'
import { type BaseUseCase } from '../../infra/base/baseUseCase'

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
