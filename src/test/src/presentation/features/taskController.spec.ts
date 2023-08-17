import * as scheduler from '../../../mock/schedule'
import * as controller from '../../../../presentation/features/taskController'
import { CreateTaskSchedulerUseCase } from '../../../../domain/features/CreateTaskSchedulerUseCase'
import { GetTaskSchedulerUseCase } from '../../../../domain/features/GetTaskSchedulerUseCase'
import { GetTaskSchedulerByNameUseCase } from '../../../../domain/features/GetTaskSchedulerByNameUseCase'
import { DeleteTaskSchedulerUseCase } from '../../../../domain/features/DeleteTaskSchedulerUseCase'
import { UpdateTaskSchedulerUseCase } from '../../../../domain/features/UpdateTaskSchedulerUseCase'
import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'
import { type TaskScheduleInterface } from '../../../../domain/protocols/TaskScheduleInterface'

jest.mock('../../../../domain/features/CreateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/GetTaskSchedulerUseCase')
jest.mock('../../../../domain/features/GetTaskSchedulerByNameUseCase')
jest.mock('../../../../domain/features/UpdateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/DeleteTaskSchedulerUseCase')
jest.mock('../../../../data/taskScheduler/repository/scheduler/TaskSchedulerRepository')

const CreateUseCaseMock = CreateTaskSchedulerUseCase as jest.Mock<CreateTaskSchedulerUseCase>
const GetAllUseCaseMock = GetTaskSchedulerUseCase as jest.Mock<GetTaskSchedulerUseCase>
const GetByNameUseCaseMock = GetTaskSchedulerByNameUseCase as jest.Mock<GetTaskSchedulerByNameUseCase>
const UpdateUseCaseMock = UpdateTaskSchedulerUseCase as jest.Mock<UpdateTaskSchedulerUseCase>
const DeleteUseCaseMock = DeleteTaskSchedulerUseCase as jest.Mock<DeleteTaskSchedulerUseCase>
let repo: TaskScheduleInterface

describe('taskController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  describe('POST', () => {
    it('Should return 400 if no name is provided', async () => {
      const bodyParams = scheduler.mock.mockRequestWithoutName
      CreateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve(HttpResponse.badRequest('name or description')))
      }))

      const sut = await controller.postSchedule(bodyParams, repo)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should return 400 if no description is provided', async () => {
      const bodyParams = scheduler.mock.mockRequestWithoutDescription
      CreateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve(HttpResponse.badRequest('name or description')))
      }))

      const sut = await controller.postSchedule(bodyParams, repo)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should return 500 if fall in catch block', async () => {
      const bodyParams = scheduler.mock.mockRequestWithoutDescription
      CreateUseCaseMock.mockImplementation((): any => Promise.resolve(HttpResponse.serverError))
      const sut = await controller.postSchedule(bodyParams, repo)
      expect(sut).toEqual(HttpResponse.serverError)
    })

    it('Should create a schedule if name and description is provided', async () => {
      const bodyParams = scheduler.mock.mockRequest
      CreateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve('New Schedule'))
      }))

      const sut = await controller.postSchedule(bodyParams, repo)
      expect(sut).toBe('New Schedule')
    })
  })

  describe('GET ALL', () => {
    it('Should return 401 if no scheduler is provided', async () => {
      GetAllUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.notFound('no schedule found')))
      }))

      const sut = await controller.getAllSchedules(repo)
      expect(sut).toEqual(HttpResponse.notFound('no schedule found'))
    })

    it('Should return 500 if fall in catch block', async () => {
      GetAllUseCaseMock.mockImplementation((): any => Promise.resolve(HttpResponse.serverError))
      const sut = await controller.getAllSchedules(repo)
      expect(sut).toEqual(HttpResponse.serverError)
    })

    it('Should return a scheduler if id is provided', async () => {
      const scheduleReturn = scheduler.mock.initialMockPost
      GetAllUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () => await Promise.resolve(scheduleReturn))
      }))

      const sut = await controller.getAllSchedules(repo)
      expect(sut).toEqual(scheduleReturn)
    })
  })

  describe('GET BY NAME', () => {
    it('Should return 401 if no name is provided', async () => {
      GetByNameUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.notFound('no schedule found')))
      }))

      const sut = await controller.getScheduleByName('', repo)
      expect(sut).toEqual(HttpResponse.notFound('no schedule found'))
    })

    it('Should return 500 if fall in catch block', async () => {
      GetByNameUseCaseMock.mockImplementation((): any => Promise.resolve(HttpResponse.serverError))
      const sut = await controller.getScheduleByName('', repo)
      expect(sut).toEqual(HttpResponse.serverError)
    })

    it('Should return a scheduler if name is provided', async () => {
      const payload = scheduler.mock.mockParamsToGetByName.name
      const schedule = scheduler.mock.afterDoneMockPost
      GetByNameUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(schedule))
      }))

      const sut = await controller.getScheduleByName(payload, repo)

      expect(sut).toEqual(schedule)
    })
  })

  describe('PUT', () => {
    it('Should return Missing param if any param is no provided', async () => {
      const scheduleRequest = scheduler.mock.mockRequest

      const sut = await controller.updateSchedule('', scheduleRequest, repo)
      expect(sut).toEqual(new MissingParamError('id query, name or description'))
    })

    it('Should return 500 if fall in catch block', async () => {
      const scheduleRequest = scheduler.mock.mockRequest
      UpdateUseCaseMock.mockImplementation((): any => Promise.resolve(HttpResponse.serverError))
      const sut = await controller.updateSchedule('123', scheduleRequest, repo)
      expect(sut).toEqual(HttpResponse.serverError)
    })

    it('Should return a scheduler if id is provided', async () => {
      const payload = scheduler.mock.initialMockPost.id
      const scheduleRequest = scheduler.mock.mockRequest
      const schedule = scheduler.mock.initialMockPost
      UpdateUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.goodRequest(schedule)))
      }))

      const sut = await controller.updateSchedule(payload, scheduleRequest, repo)
      expect(sut).toEqual(HttpResponse.goodRequest(schedule))
    })
  })

  describe('DEL', () => {
    it('Should return Missing param if id is no provided', async () => {
      DeleteUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(new MissingParamError('id')))
      }))

      const sut = await controller.deleteSchedule('', repo)
      expect(sut).toEqual(new MissingParamError('id'))
    })

    it('Should return 500 if fall in catch block', async () => {
      DeleteUseCaseMock.mockImplementation((): any => Promise.resolve(HttpResponse.serverError))
      const sut = await controller.deleteSchedule('', repo)
      expect(sut).toEqual(HttpResponse.serverError)
    })

    it('Should return a scheduler deleted if id is provided', async () => {
      const payload = scheduler.mock.initialMockPost.id
      const schedule = scheduler.mock.afterDeleteMockPost
      DeleteUseCaseMock.mockImplementation((): any => ({
        execute: jest.fn(async () =>
          await Promise.resolve(HttpResponse.goodRequest(schedule)))
      }))

      const sut = await controller.deleteSchedule(payload, repo)
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
