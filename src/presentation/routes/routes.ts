import { type FastifyReply, type FastifyPluginCallback, type FastifyRequest } from 'fastify'
import * as controller from '../features/taskController'
import { HttpResponse } from '../helpers/HttpResponse'

export const route: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/schedule', controller.postSchedule)
  fastify.get('/schedule', controller.getAllSchedules)
  fastify.get('/schedules/:name', controller.getScheduleByName)
  fastify.put('/schedule/:id', controller.updateSchedule)
  fastify.delete('/schedule/:id', controller.deleteSchedule)
  fastify.get('/health/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name } = Object(request.params)

      return await reply.send(await controller.healthCheck(name))
    } catch (error) {
      console.error(error)
      return await reply.code(500).send(HttpResponse.serverError)
    }
  })
  done()
}
