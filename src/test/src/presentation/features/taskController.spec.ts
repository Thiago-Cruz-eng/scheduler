import * as scheduler from '../../../mock/schedule'
import * as controller from '../../../../presentation/features/taskController'
import { CreateTaskSchedulerUseCase } from '../../../../domain/features/CreateTaskSchedulerUseCase'
import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { MissingParamError } from '../../../../presentation/helpers/MissingParamError'
/*
import { HttpResponse } from '../../../../presentation/helpers/HttpResponse'
import { TaskSchedulerResponse } from '../../../../presentation/protocols/response/TaskSchedulerResponse'
import { GetTaskSchedulerUseCase } from '../../domain/features/GetTaskSchedulerUseCase'
import { UpdateTaskSchedulerUseCase } from '../../domain/features/UpdateTaskSchedulerUseCase'
import { DeleteTaskSchedulerUseCase } from '../../domain/features/DeleteTaskSchedulerUseCase'
import { MissingParamError } from '../helpers/MissingParamError'
import { type TaskScheduleData } from '../../../../domain/models/TaskScheduleData'
*/
jest.mock('../../../../domain/features/CreateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/GetTaskSchedulerUseCase')
jest.mock('../../../../domain/features/UpdateTaskSchedulerUseCase')
jest.mock('../../../../domain/features/DeleteTaskSchedulerUseCase')
jest.mock('../../../../presentation/helpers/HttpResponse')
jest.mock('../../../../presentation/helpers/MissingParamError')

const CreateUseCaseMock = CreateTaskSchedulerUseCase as jest.Mock<CreateTaskSchedulerUseCase>

describe('taskController', () => {
  describe('POST', () => {
    it('Should return 400 if no name is provided', async () => {
      const httpRequest = {
        name: '',
        description: 'abc'
      }
      const sut = await controller.postSchedule(httpRequest)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should return 400 if no description is provided', async () => {
      const httpRequest = {
        name: 'abc',
        description: ''
      }
      const sut = await controller.postSchedule(httpRequest)
      expect(sut).toEqual(HttpResponse.badRequest('name or description'))
    })

    it('Should create a schedule if name and description is provided', async () => {
      const bodyParams = scheduler.data.mockRequest

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
