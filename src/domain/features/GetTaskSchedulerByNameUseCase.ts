import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/TaskSchedulerRepository'
import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'

export class GetTaskSchedulerByNameUseCase implements BaseUseCase {
  private readonly payload?: string
  private readonly repository: TaskScheduleInterface = new TaskSchedulerRepository()
  constructor (payload?: string) {
    this.payload = payload
  }

  async execute (): Promise<any> {
    if (this.payload) {
      const schedule = await this.repository.getScheduleByName(this.payload)

      if (!schedule) {
        return HttpResponse.notFound('no schedule found')
      }
      return HttpResponse.goodRequest(schedule)
    }
  }
}
