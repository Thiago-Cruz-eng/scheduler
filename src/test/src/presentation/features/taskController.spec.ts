import * as scheduler from '../../../mock/schedule'
import * as controller from '../../../../presentation/features/taskController'
import { CreateTaskSchedulerUseCase } from '../../../../domain/features/CreateTaskSchedulerUseCase'
import { GetTaskSchedulerUseCase } from '../../../../domain/features/GetTaskSchedulerUseCase'
import { DeleteTaskSchedulerUseCase } from '../../../../domain/features/DeleteTaskSchedulerUseCase'
import { UpdateTaskSchedulerUseCase } from '../../../../domain/features/UpdateTaskSchedulerUseCase'
import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'

jest.mock('../../../../domain/features/CreateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/GetTaskSchedulerUseCase')
jest.mock('../../../../domain/features/UpdateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/DeleteTaskSchedulerUseCase')
jest.mock('../../../../presentation/helpers/HttpResponse')
jest.mock('../../../../presentation/helpers/MissingParamError')

const CreateUseCaseMock = CreateTaskSchedulerUseCase as jest.Mock<CreateTaskSchedulerUseCase>
const GetAllUseCaseMock = GetTaskSchedulerUseCase as jest.Mock<GetTaskSchedulerUseCase>
const DeleteUseCaseMock = DeleteTaskSchedulerUseCase as jest.Mock<DeleteTaskSchedulerUseCase>
const UpdateUseCaseMock = UpdateTaskSchedulerUseCase as jest.Mock<UpdateTaskSchedulerUseCase>

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
    it('getAllSchedules', () => {
      expect(1).toBe(1)
    })
  })

  describe('GET BY NAME', () => {
    it('getScheduleByName', () => {
      expect(1).toBe(1)
    })
  })

  describe('PUT', () => {
    it('updateSchedule', () => {
      expect(1).toBe(1)
    })
  })

  describe('DEL', () => {
    it('deleteSchedule', () => {
      expect(1).toBe(1)
    })
  })

  describe('GET HEALTH', () => {
    it('healthCheck', () => {
      expect(1).toBe(1)
    })
  })
})
