import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'

export class GetTaskSchedulerByNameUseCase implements BaseUseCase {
  private readonly payload?: string
  private readonly repository: TaskScheduleInterface
  constructor (repository: TaskScheduleInterface, payload?: string) {
    this.payload = payload
    this.repository = repository
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
