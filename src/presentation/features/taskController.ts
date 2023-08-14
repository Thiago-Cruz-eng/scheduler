import { z } from 'zod'
import { CreateTaskSchedulerUseCase } from '../../domain/features/CreateTaskSchedulerUseCase'
import { HttpResponse } from '../helpers/HttpResponse'
import { GetTaskSchedulerUseCase } from '../../domain/features/GetTaskSchedulerUseCase'
import { UpdateTaskSchedulerUseCase } from '../../domain/features/UpdateTaskSchedulerUseCase'
import { DeleteTaskSchedulerUseCase } from '../../domain/features/DeleteTaskSchedulerUseCase'

const createScheduleSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name have to be a string'
  }),
  description: z.string({
    required_error: 'description is required',
    invalid_type_error: 'description have to be a string'
  })
})

export const postSchedule = async (bodyParams: object): Promise<object> => {
  try {
    const body = createScheduleSchema.parse(bodyParams)
    const create = new CreateTaskSchedulerUseCase(body)

    return await create.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const getAllSchedules = async (): Promise<object> => {
  try {
    const getAll = new GetTaskSchedulerUseCase()
    return await getAll.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const getScheduleByName = async (name: string): Promise<object> => {
  try {
    const getByName = new GetTaskSchedulerUseCase(name)
    return await getByName.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const updateSchedule = async (id: string, bodyRequest: object): Promise<object> => {
  try {
    const body = createScheduleSchema.parse(bodyRequest)
    const updateSchedule = new UpdateTaskSchedulerUseCase(id, body)
    return await updateSchedule.execute()
  } catch (error) {
    console.error(error)
    return HttpResponse.serverError
  }
}

export const deleteSchedule = async (id: string): Promise<object> => {
  try {
    const toDelete = new DeleteTaskSchedulerUseCase(id)
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
