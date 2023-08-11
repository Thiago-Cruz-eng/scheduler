import { type FastifyPluginCallback } from 'fastify'
import * as controller from '../features/taskController'

export const route: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/schedule', controller.postSchedule)
  fastify.get('/schedule', controller.getAllSchedules)
  fastify.get('/schedules/:name', controller.getScheduleByName)
  fastify.put('/schedule/:id', controller.updateSchedule)
  fastify.delete('/schedule/:id', controller.deleteSchedule)
  fastify.get('/health', controller.healthCheck)
  done()
}
