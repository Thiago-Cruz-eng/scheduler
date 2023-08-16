import { type FastifyReply, type FastifyPluginCallback, type FastifyRequest } from 'fastify'
import * as controller from '../features/taskController'
import { HttpResponse } from '../helpers/HttpResponse'
import { type TaskSchedulerResponse } from '../protocols/response/TaskSchedulerResponse'
import { TaskSchedulerMapper } from '../mapper/TaskSchedulerMapper'
import { type TaskScheduleInterface } from '../../domain/protocols/TaskScheduleInterface'
import { TaskSchedulerRepository } from '../../data/taskScheduler/repository/scheduler/TaskSchedulerRepository'

const repository: TaskScheduleInterface = new TaskSchedulerRepository()

export const route: FastifyPluginCallback = (server, opts, done) => {
  server.post('/schedule', async (request: FastifyRequest, reply: FastifyReply): Promise<TaskSchedulerResponse> => {
    try {
      const requestMapper = new TaskSchedulerMapper()
      const body = requestMapper.dataToModel(Object(request.body))
      const createdSchedule = await controller.postSchedule(body, repository)

      return await reply.code(201).send(createdSchedule)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  server.get('/schedule', async (request: FastifyRequest, reply: FastifyReply): Promise<TaskSchedulerResponse> => {
    try {
      const getAll = await controller.getAllSchedules(repository)
      return await reply.code(201).send(getAll)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  server.get('/schedules/:name', async (request: FastifyRequest, reply: FastifyReply): Promise<TaskSchedulerResponse> => {
    try {
      const { name } = Object(request.params)
      const scheduleByName = await controller.getScheduleByName(name, repository)

      return await reply.code(201).send(scheduleByName)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  server.put('/schedule/:id', async (request: FastifyRequest, reply: FastifyReply): Promise<TaskSchedulerResponse> => {
    try {
      const { id } = Object(request.params)
      const requestMapper = new TaskSchedulerMapper()
      const body = requestMapper.dataToModel(Object(request.body))
      const updateSchedule = await controller.updateSchedule(id, body, repository)
      return await reply.code(201).send(updateSchedule)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  server.delete('/schedule/:id', async (request: FastifyRequest, reply: FastifyReply): Promise<TaskSchedulerResponse> => {
    try {
      const { id } = Object(request.params)
      return await reply.send(await controller.deleteSchedule(id, repository))
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  server.get('/health/:name', async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
    try {
      return await reply.send(await controller.healthCheck())
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })
  done()
}
