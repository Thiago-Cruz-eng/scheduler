import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'
import * as scheduler from '../../../mock/schedule'
import { CreateTaskSchedulerUseCase } from '../../../../domain/features/CreateTaskSchedulerUseCase'
import { repository } from '../../data/TaskSchedulerRepository'

describe('CREATE USE CASE', () => {
  it('should return missing param error if no payload is provided', async () => {
    const payload = scheduler.mock.mockRequestWithoutName

    const sut = await new CreateTaskSchedulerUseCase(payload, repository)

    expect(await sut.execute()).toEqual(new MissingParamError('name'))
  })

  it('should return a new scheduler if right payload is provided', async () => {
    const payload = scheduler.mock.mockRequest

    const sut = await new CreateTaskSchedulerUseCase(payload, repository)

    expect(await sut.execute()).toEqual(HttpResponse.goodRequest(scheduler.mock.initialMockPost))
  })
})
