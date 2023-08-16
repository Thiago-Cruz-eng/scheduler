import { MissingParamError } from '../../presentation/helpers/MissingParamError'
import { HttpResponse } from '../../presentation/helpers/HttpResponse'
import { type BaseUseCase } from '../../infra/base/BaseUseCase'
import { type TaskScheduleData } from '../models/TaskScheduleData'
import { type TaskScheduleInterface } from '../protocols/TaskScheduleInterface'

export class CreateTaskSchedulerUseCase implements BaseUseCase {
  private readonly payload: TaskScheduleData
  private readonly repository: TaskScheduleInterface
  constructor (payload: TaskScheduleData, repository: TaskScheduleInterface) {
    this.payload = payload
    this.repository = repository
  }

  async execute (): Promise<any> {
    if (!this.payload.name) {
      return new MissingParamError('name')
    }

    const newSchedule = await this.repository.saveSchedule(this.payload)
    return HttpResponse.goodRequest(newSchedule)
  }
}
