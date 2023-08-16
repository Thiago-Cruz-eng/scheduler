import TaskSchedulerRepository from '../../data/taskScheduler/repository/scheduler/TaskSchedulerRepository'
import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'

export class GetTaskSchedulerUseCase implements BaseUseCase {
  private readonly repository: TaskScheduleInterface = new TaskSchedulerRepository()

  async execute (): Promise<any> {
    const schedule = await this.repository.getAllSchedule()
    if (!schedule) return HttpResponse.notFound('no schedule found')
    return HttpResponse.goodRequest(schedule)
  }
}
