import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/taskSchedulerRepository'
import { type TaskScheduleInterface } from '../../domain/protocols/taskScheduleInterface'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/baseUseCase'

export class GetTaskSchedulerUseCase implements BaseUseCase {
  private readonly payload?: string
  private readonly repository: TaskScheduleInterface = new TaskSchedulerRepository()
  constructor (payload?: string) {
    this.payload = payload
  }

  async execute (): Promise<any> {
    if (this.payload) {
      const schedule = await this.repository.getScheduleByName(this.payload)

      if (!schedule) return HttpResponse.notFound('no schedule found')
      return HttpResponse.goodRequest(schedule)
    }

    const schedule = await this.repository.getAllSchedule()
    return HttpResponse.goodRequest(schedule)
  }
}
