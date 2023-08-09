import { FastifyPluginCallback, RequestGenericInterface } from 'fastify'
import { z } from 'zod'
import { TaskSchedulerRepository } from '../../data/repository/scheduler/taskSchedulerRepository'
import { TaskScheduleInterface } from '@/domain/protocols/taskScheduleInterface'
import { MissingParamError } from '../helpers/missingParamError';
import { HttpResponse } from '../helpers/httpResponse';

const createScheduleSchema = z.object({
    name: z.string({
      required_error: "name is required",
      invalid_type_error: "name have to be a string"
    }),
    description: z.string({
      required_error: "description is required",
      invalid_type_error: "description have to be a string"
    })
});

const repository: TaskScheduleInterface = new TaskSchedulerRepository()

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/schedule', async (request, reply) => {
    try {

      const body = createScheduleSchema.parse(request.body);

      if (!body.name) {
        reply.code(400).send(new MissingParamError('name'))
        return;
      }

      const newSchedule = await repository.saveSchedule(body)

      reply.code(201).send(newSchedule) 

    } catch (error) {

      console.error(error)
      reply.code(500).send(HttpResponse.serverError)

    }
  });

  fastify.get('/schedule', async (request, reply) => {
    try {

      const allSchedules = await repository.getAllSchedule()
      reply.code(201).send(allSchedules);

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  })

  fastify.get('/schedules/:name', async (request, reply) => {
    try {
      const { name } = Object(request.params)
      console.log(request.params)
      if(!name) return reply.code(404).send("Nenhuma task task encontrada.")
      const allSchedulesByName = await repository.getScheduleByName(name);
      reply.code(201).send(allSchedulesByName)
    } catch (error) {

      console.error(error)
      reply.code(500).send(HttpResponse.serverError)

    }
  })

  fastify.put('/schedule/:id', async (request, reply) => {  
    try {
      const { id }  = Object(request.params)

      const body = createScheduleSchema.parse(request.body)

      if (!body.name) {
        reply.code(400).send(new MissingParamError('name'));
        return;
      }

      const updateSchedule = await repository.updateSchedule(id, body)
      reply.code(201).send(updateSchedule)

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  });

  fastify.delete('/schedule/:id', async (request, reply) => {
    try {

      const { id } = Object(request.params)
      const deletedSchedule = await repository.deleteSchedule(id)
      reply.code(201).send(deletedSchedule);

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  });

  fastify.get('/health', async (request, reply) => {
    try {
      reply.send("Running");
    } catch (error) {
      console.error(error);
      reply.code(500).send(HttpResponse.serverError)
    }
  });
  done();
};

export default routes;
