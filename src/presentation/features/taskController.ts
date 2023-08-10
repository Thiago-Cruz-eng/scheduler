import { FastifyPluginCallback, RequestGenericInterface } from 'fastify'
import { z } from 'zod'
import { CreateTaskSchedulerUseCase } from "../../domain/features/createTaskSchedulerUseCase"
import { HttpResponse } from '../helpers/httpResponse';
import { GetTaskSchedulerUseCase } from '../../domain/features/getTaskSchedulerUseCase';
import { UpdateTaskSchedulerUseCase } from '../../domain/features/updateTaskSchedulerUseCase';
import { DeleteTaskSchedulerUseCase } from '../../domain/features/deleteTaskSchedulerUseCase';

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

const routes: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/schedule', async (request, reply) => {
    try {

      const body = createScheduleSchema.parse(request.body);
      const create = new CreateTaskSchedulerUseCase(body)

      const newSchedule = await create.execute()

      reply.code(201).send(newSchedule) 

    } catch (error) {

      console.error(error)
      reply.code(500).send(HttpResponse.serverError)

    }
  });

  fastify.get('/schedule', async (request, reply) => {
    try {

      const getAll = new GetTaskSchedulerUseCase()

      const allSchedules = await getAll.execute()
      reply.code(201).send(allSchedules);

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  })

  fastify.get('/schedules/:name', async (request, reply) => {
    try {
      const { name } = Object(request.params)
      const getByName = new GetTaskSchedulerUseCase(name)

      const allSchedulesByName = await getByName.execute();
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
      const updateSchedule = new UpdateTaskSchedulerUseCase(id, body)

      const updatedSchedule = await updateSchedule.execute()
      reply.code(201).send(updatedSchedule)

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  });

  fastify.delete('/schedule/:id', async (request, reply) => {
    try {

      const { id } = Object(request.params)
      const toDelete = new DeleteTaskSchedulerUseCase(id)
      const deleted = await toDelete.execute()

      reply.code(201).send(deleted) 

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
      reply.code(500).send({ error: 'Internal server error.' });
    }
  });
  done();
};

export default routes;
