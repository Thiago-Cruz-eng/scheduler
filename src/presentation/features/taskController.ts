import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { HttpResponse } from '@/presentation/helpers/httpResponse';
import { CreateTaskSchedulerUseCase } from '@/domain/features/createTaskSchedulerUseCase';
import { DeleteTaskSchedulerUseCase } from '@/domain/features/deleteTaskSchedulerUseCase';
import { GetTaskSchedulerUseCase } from '@/domain/features/getTaskSchedulerUseCase';
import { UpdateTaskSchedulerUseCase } from '@/domain/features/updateTaskSchedulerUseCase';


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

export default class TaskSchedulerController {

  private saveSchedule = async(request:any, reply:any) => {
    try {

      const body = createScheduleSchema.parse(request.body);
      const create = new CreateTaskSchedulerUseCase(body)

      const newSchedule = await create.execute()

      reply.code(201).send(newSchedule) 

    } catch (error) {

      console.error(error)
      reply.code(500).send(HttpResponse.serverError)

    }
  }

  private getAllSchedule = async(request:any, reply:any) => {
     try {

      const getAll = new GetTaskSchedulerUseCase()

      const allSchedules = await getAll.execute()
      reply.code(201).send(allSchedules);

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  }

  private getScheduleByName = async(request:any, reply:any) => {
    try {
      const { name } = Object(request.params)
      const getByName = new GetTaskSchedulerUseCase(name)

      const allSchedulesByName = await getByName.execute();
      reply.code(201).send(allSchedulesByName)
    } catch (error) {

      console.error(error)
      reply.code(500).send(HttpResponse.serverError)

    }
  }

  private updateSchedule = async(request:any, reply:any) => {
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
  }

  private deleteSchedule = async(request:any, reply:any) => {
    try {

      const { id } = Object(request.params)
      const toDelete = new DeleteTaskSchedulerUseCase(id)
      const deleted = await toDelete.execute()

      reply.code(201).send(deleted) 

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  }

  setupRoutes(server: FastifyInstance): any {
    server.post('/schedule', this.saveSchedule)
    server.get('/schedule', this.getAllSchedule)
    server.get('/schedules/:name', this.getScheduleByName)
    server.put('/schedule/:id', this.updateSchedule)
    server.delete('/schedule/:id', this.deleteSchedule)
  }
}