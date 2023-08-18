import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import * as scheduler from '../../../mock/schedule'
import { repository } from '../../data/TaskSchedulerRepository'
import { GetTaskSchedulerUseCase } from '../../../../domain/features/GetTaskSchedulerUseCase'

describe('GET ALL USE CASE', () => {
  it('should return missing param error if no payload is provided', async () => {
    const sut = await new GetTaskSchedulerUseCase(repository).execute()
    console.log(await sut, '==============', { body: HttpResponse.notFound('no schedule found') })

    expect(await sut).toEqual({ body: HttpResponse.notFound('no schedule found') })
  })

  it('should return a new scheduler if right payload is provided', async () => {
    const sut = await new GetTaskSchedulerUseCase(repository).execute()

    expect(await sut).toEqual(HttpResponse.goodRequest(scheduler.mock))
  })
})
