import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'
import * as scheduler from '../../../mock/schedule'
import { repository } from '../../data/TaskSchedulerRepository'
import { DeleteTaskSchedulerUseCase } from '../../../../domain/features/DeleteTaskSchedulerUseCase'

describe('DELETE USE CASE', () => {
  it('should return missing param error if no payload is provided', async () => {
    const payload = ''

    const sut = await new DeleteTaskSchedulerUseCase(payload, repository).execute()

    expect(await sut).toEqual(new MissingParamError('id'))
  })

  it('should return a new scheduler if right payload is provided', async () => {
    const payload = scheduler.mock.initialMockPost.id

    const sut = await new DeleteTaskSchedulerUseCase(payload, repository).execute()

    expect(await sut).toEqual(HttpResponse.goodRequest(scheduler.mock.afterDeleteMockPost))
  })
})
