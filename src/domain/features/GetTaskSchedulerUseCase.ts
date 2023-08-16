import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'

export class GetTaskSchedulerUseCase implements BaseUseCase {
  private readonly repository: TaskScheduleInterface
  constructor (repository: TaskScheduleInterface) {
    this.repository = repository
  }

  async execute (): Promise<any> {
    const schedule = await this.repository.getAllSchedule()
    if (!schedule) return HttpResponse.notFound('no schedule found')
    return HttpResponse.goodRequest(schedule)
  }
}
