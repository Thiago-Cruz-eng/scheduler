import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'
import * as scheduler from '../../../mock/schedule'
import { repository } from '../../../src/data/TaskSchedulerRepository'
import { CreateTaskSchedulerUseCase } from '../../../../domain/features/CreateTaskSchedulerUseCase'

jest.mock('../../../../domain/features/CreateTaskSchedulerUseCase')

const CreateUseCaseMock = CreateTaskSchedulerUseCase as jest.Mock<CreateTaskSchedulerUseCase>

describe('CREATE USE CASE', () => {
  it('should return missing param error if no payload is provided', async () => {
    /* const payload = scheduler.mock.mockRequestWithoutName
    const sut = new CreateTaskSchedulerUseCase(payload, repository)
    sut.execute()
    expect(sut).toEqual(new MissingParamError('name')) */
  })

  it('should return a new scheduler if right payload is provided', async () => {
    /* const payload = scheduler.mock.mockRequest
    CreateUseCaseMock.mockImplementation((): any => ({
      execute: jest.fn(async () => await Promise.resolve(HttpResponse.badRequest('name or description')))
    }))
    const sut = new CreateTaskSchedulerUseCase(payload, repository)
    console.log(sut)

    expect(sut.execute()).toEqual('') */
  })
})
