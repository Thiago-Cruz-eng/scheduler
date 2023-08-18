import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'
import * as scheduler from '../../../mock/schedule'
import { repository } from '../../data/TaskSchedulerRepository'
import { UpdateTaskSchedulerUseCase } from '../../../../domain/features/UpdateTaskSchedulerUseCase'
import { MissingBodyError } from '../../../../presentation/helpers/MissingBodyError'

describe('UPDATE USE CASE', () => {
  it('should return missing param id if no correct payload is provided', async () => {
    const id = ''
    const payload = scheduler.mock.mockRequest

    const sut = await new UpdateTaskSchedulerUseCase(id, payload, repository).execute()

    expect(await sut).toEqual(new MissingParamError('id'))
  })

  it('should return missing param name if no correct payload is provided', async () => {
    const id = scheduler.mock.initialMockPost.id
    const payload = scheduler.mock.mockRequestWithoutName

    const sut = await new UpdateTaskSchedulerUseCase(id, payload, repository).execute()

    expect(await sut).toEqual(new MissingBodyError('name'))
  })

  it('should return a new scheduler if right payload is provided', async () => {
    const id = scheduler.mock.initialMockPost.id
    const payload = scheduler.mock.mockRequest

    const sut = await new UpdateTaskSchedulerUseCase(id, payload, repository).execute()

    expect(await sut).toEqual(HttpResponse.goodRequest(scheduler.mock.upadatedInitialMockPost))
  })
})
