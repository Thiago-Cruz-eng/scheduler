import type { FastifyReply, FastifyRequest } from 'fastify'
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

export const postSchedule = async (request: FastifyRequest, reply: FastifyReply): Promise<object> => {
  try {
    const body = createScheduleSchema.parse(request.body)
    const create = new CreateTaskSchedulerUseCase(body)

    const newSchedule = await create.execute()

    return await reply.code(201).send(newSchedule)
  } catch (error) {
    console.error(error)
    return await reply.code(500).send(HttpResponse.serverError)
  }
}

export const getAllSchedules = async (request: FastifyRequest, reply: FastifyReply): Promise<object> => {
  try {
    const getAll = new GetTaskSchedulerUseCase()

    const allSchedules = await getAll.execute()
    return await reply.code(201).send(allSchedules)
  } catch (error) {
    console.error(error)
    return await reply.code(500).send(HttpResponse.serverError)
  }
}

export const getScheduleByName = async (request: FastifyRequest, reply: FastifyReply): Promise<object> => {
  try {
    const { name } = Object(request.params)
    const getByName = new GetTaskSchedulerUseCase(name)

    const allSchedulesByName = await getByName.execute()
    return await reply.code(201).send(allSchedulesByName)
  } catch (error) {
    console.error(error)
    return await reply.code(500).send(HttpResponse.serverError)
  }
}

export const updateSchedule = async (request: FastifyRequest, reply: FastifyReply): Promise<object> => {
  try {
    const { id } = Object(request.params)
    const body = createScheduleSchema.parse(request.body)
    const updateSchedule = new UpdateTaskSchedulerUseCase(id, body)

    const updatedSchedule = await updateSchedule.execute()
    return await reply.code(201).send(updatedSchedule)
  } catch (error) {
    console.error(error)
    return await reply.code(500).send(HttpResponse.serverError)
  }
}

export const deleteSchedule = async (request: FastifyRequest, reply: FastifyReply): Promise<object> => {
  try {
    const { id } = Object(request.params)
    const toDelete = new DeleteTaskSchedulerUseCase(id)
    const deleted = await toDelete.execute()

    return await reply.code(201).send(deleted)
  } catch (error) {
    console.error(error)
    return await reply.code(500).send(HttpResponse.serverError)
  }
}

export const healthCheck = async (request: FastifyRequest, reply: FastifyReply): Promise<object> => {
  try {
    return await reply.send('Running')
  } catch (error) {
    console.error(error)
    return await reply.code(500).send(HttpResponse.serverError)
  }
}
