import { type FastifyReply, type FastifyPluginCallback, type FastifyRequest } from 'fastify'
import * as controller from '../features/taskController'
import { HttpResponse } from '../helpers/HttpResponse'

export const route: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/schedule', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const body = Object(request.body)
      const createdSchedule = controller.postSchedule(body)
      return await reply.code(201).send(createdSchedule)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  fastify.get('/schedule', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const getAll = controller.getAllSchedules()
      return await reply.code(201).send(getAll)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  fastify.get('/schedules/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name } = Object(request.params)
      const scheduleByName = controller.getScheduleByName(name)
      return await reply.code(201).send(scheduleByName)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  fastify.put('/schedule/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = Object(request.params)
      const body = Object(request.body)
      const updateSchedule = controller.updateSchedule(id, body)
      return await reply.code(201).send(updateSchedule)
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  fastify.delete('/schedule/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = Object(request.params)
      return await reply.send(await controller.deleteSchedule(id))
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })

  fastify.get('/health/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return await reply.send(await controller.healthCheck())
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })
  done()
}
