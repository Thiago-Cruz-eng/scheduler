import * as scheduler from '../../../mock/schedule'
import * as controller from '../../../../presentation/features/taskController'
import { CreateTaskSchedulerUseCase } from '../../../../domain/features/CreateTaskSchedulerUseCase'
import { GetTaskSchedulerUseCase } from '../../../../domain/features/GetTaskSchedulerUseCase'
import { GetTaskSchedulerByNameUseCase } from '../../../../domain/features/GetTaskSchedulerByNameUseCase'
import { DeleteTaskSchedulerUseCase } from '../../../../domain/features/DeleteTaskSchedulerUseCase'
import { UpdateTaskSchedulerUseCase } from '../../../../domain/features/UpdateTaskSchedulerUseCase'
import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'

jest.mock('../../../../domain/features/CreateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/GetTaskSchedulerUseCase')
jest.mock('../../../../domain/features/GetTaskSchedulerByNameUseCase')
jest.mock('../../../../domain/features/UpdateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/DeleteTaskSchedulerUseCase')

const CreateUseCaseMock = CreateTaskSchedulerUseCase as jest.Mock<CreateTaskSchedulerUseCase>
const GetAllUseCaseMock = GetTaskSchedulerUseCase as jest.Mock<GetTaskSchedulerUseCase>
const GetByNameUseCaseMock = GetTaskSchedulerByNameUseCase as jest.Mock<GetTaskSchedulerByNameUseCase>
const UpdateUseCaseMock = UpdateTaskSchedulerUseCase as jest.Mock<UpdateTaskSchedulerUseCase>
const DeleteUseCaseMock = DeleteTaskSchedulerUseCase as jest.Mock<DeleteTaskSchedulerUseCase>

describe('taskController', () => {
  describe('POST', () => {
    it('Should return 400 if no name is provided', async () => {
      const bodyParams = scheduler.mock.mockRequestWithoutName
      CreateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve(HttpResponse.badRequest('name or description')))
      }))

      const sut = await controller.postSchedule(bodyParams)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should return 400 if no description is provided', async () => {
      const bodyParams = scheduler.mock.mockRequestWithoutDescription
      CreateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve(HttpResponse.badRequest('name or description')))
      }))

      const sut = await controller.postSchedule(bodyParams)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should create a schedule if name and description is provided', async () => {
      const bodyParams = scheduler.mock.mockRequest
      CreateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve('New Schedule'))
      }))

      const result = await controller.postSchedule(bodyParams)
      expect(result).toBe('New Schedule')
    })
  })

  describe('GET ALL', () => {
    it('Should return 401 if no scheduler is provided', async () => {
      GetAllUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.notFound('no schedule found')))
      }))

      const sut = await controller.getAllSchedules()
      expect(sut).toEqual(HttpResponse.notFound('no schedule found'))
    })

    it('Should return a scheduler if id is provided', async () => {
      const scheduleReturn = scheduler.mock.initialMockPost
      GetAllUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve(scheduleReturn))
      }))

      const sut = await controller.getAllSchedules()
      expect(sut).toEqual(scheduleReturn)
    })
  })

  describe('GET BY NAME', () => {
    it('Should return 401 if no name is provided', async () => {
      GetByNameUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.notFound('no schedule found')))
      }))

      const sut = await controller.getScheduleByName('')
      expect(sut).toEqual(HttpResponse.notFound('no schedule found'))
    })

    it('Should return a scheduler if name is provided', async () => {
      const payload = scheduler.mock.mockParamsToGetByName.name
      const schedule = scheduler.mock.afterDoneMockPost
      GetByNameUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(schedule))
      }))

      const sut = await controller.getScheduleByName(payload)

      expect(sut).toEqual(schedule)
    })
  })

  describe('PUT', () => {
    it('Should return Missing param if any param is no provided', async () => {
      const scheduleRequest = scheduler.mock.mockRequest
      UpdateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(new MissingParamError('id')))
      }))

      const sut = await controller.updateSchedule('', scheduleRequest)
      expect(sut).toEqual(new MissingParamError('id query, name or description'))
    })

    it('Should return a scheduler if id is provided', async () => {
      const payload = scheduler.mock.initialMockPost.id
      const scheduleRequest = scheduler.mock.mockRequest
      const schedule = scheduler.mock.initialMockPost
      UpdateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.goodRequest(schedule)))
      }))

      const sut = await controller.updateSchedule(payload, scheduleRequest)
      expect(sut).toEqual(HttpResponse.goodRequest(schedule))
    })
  })

  describe('DEL', () => {
    it('Should return Missing param if id is no provided', async () => {
      DeleteUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(new MissingParamError('id')))
      }))

      const sut = await controller.deleteSchedule('')
      expect(sut).toEqual(new MissingParamError('id'))
    })

    it('Should return a scheduler deleted if id is provided', async () => {
      const payload = scheduler.mock.initialMockPost.id
      const schedule = scheduler.mock.afterDeleteMockPost
      DeleteUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.goodRequest(schedule)))
      }))

      const sut = await controller.deleteSchedule(payload)
      expect(sut).toEqual(HttpResponse.goodRequest(schedule))
    })
  })

  describe('GET HEALTH', () => {
    it('Should return Running if server running', async () => {
      const sut = await controller.healthCheck()
      expect(sut).toEqual('Running')
    })
  })
})
