import { CreateTaskSchedulerUseCase } from '../../domain/features/CreateTaskSchedulerUseCase'
import { HttpResponse } from '../helpers/HttpResponse'
import { GetTaskSchedulerUseCase } from '../../domain/features/GetTaskSchedulerUseCase'
import { GetTaskSchedulerByNameUseCase } from '../../domain/features/GetTaskSchedulerByNameUseCase'
import { UpdateTaskSchedulerUseCase } from '../../domain/features/UpdateTaskSchedulerUseCase'
import { DeleteTaskSchedulerUseCase } from '../../domain/features/DeleteTaskSchedulerUseCase'
import { type TaskScheduleData } from '../../domain/models/TaskScheduleData'
import { MissingParamError } from '../helpers/MissingParamError'
import { type TaskScheduleInterface } from '../../domain/protocols/TaskScheduleInterface'

export const postSchedule = async (bodyParams: TaskScheduleData, repository: TaskScheduleInterface): Promise<object> => {
  try {
    if (!bodyParams.description || !bodyParams.name) {
      return HttpResponse.badRequest('name or description')
    }
    const createdSchedule = new CreateTaskSchedulerUseCase(bodyParams, repository)
    return await createdSchedule.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const getAllSchedules = async (repository: TaskScheduleInterface): Promise<object[] | object> => {
  try {
    const getAll = new GetTaskSchedulerUseCase(repository)
    return await getAll.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const getScheduleByName = async (name: string, repository: TaskScheduleInterface): Promise<object> => {
  try {
    const getByName = new GetTaskSchedulerByNameUseCase(repository, name)
    return await getByName.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const updateSchedule = async (id: string, bodyRequest: TaskScheduleData, repository: TaskScheduleInterface): Promise<object> => {
  try {
    if (!id || !bodyRequest.name || !bodyRequest.description) {
      return new MissingParamError('id query, name or description')
    }
    const updateSchedule = new UpdateTaskSchedulerUseCase(id, bodyRequest, repository)
    return await updateSchedule.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const deleteSchedule = async (id: string, repository: TaskScheduleInterface): Promise<object> => {
  try {
    const toDelete = new DeleteTaskSchedulerUseCase(id, repository)
    return await toDelete.execute()
  } catch (error) {
    return HttpResponse.serverError
  }
}

export const healthCheck = async (): Promise<string | object> => {
  try {
    return await new Promise((resolve, reject) => { resolve('Running') })
  } catch (error) {
    return HttpResponse.serverError
  }
}
