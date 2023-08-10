import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify'
import { z } from 'zod'
import { HttpResponse } from '../helpers/httpResponse';
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

export class TaskSchedulerController {
  private server: FastifyInstance;
  constructor(
      server: FastifyInstance, 
    ) {
    this.server = server;
    this.setupRoutes()
  }

  setupRoutes() {
    this.server.post('/schedule', this.saveSchedule)
    this.server.get('/schedule', this.getAllSchedule)
    this.server.get('/schedules/:name', this.getScheduleByName)
    this.server.put('/schedule/:id', this.updateSchedule)
    this.server.delete('/schedule/:id', this.deleteSchedule)
  }

  private saveSchedule = async(request:any, reply:any) => {
    try {

      const body = createScheduleSchema.parse(request.body);

      const create = new CreateTaskSchedulerUseCase(body)

      const newSchedule = create.execute()

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

      const deleted = toDelete.execute()

      reply.code(201).send(deleted) 

    } catch (error) {

      console.error(error);
      reply.code(500).send(HttpResponse.serverError)

    }
  }

}


// const routes: FastifyPluginCallback = (fastify, opts, done) => {
//   fastify.post('/schedule', async (request, reply) => {
//     try {

//       const body = createScheduleSchema.parse(request.body);

//       if (!body.name) {
//         reply.code(400).send(new MissingParamError('name'))
//         return;
//       }

//       const newSchedule = await repository.saveSchedule(body)

//       reply.code(201).send(newSchedule) 

//     } catch (error) {

//       console.error(error)
//       reply.code(500).send(HttpResponse.serverError)

//     }
//   });

//   fastify.get('/schedule', async (request, reply) => {
//     try {

//       const allSchedules = await repository.getAllSchedule()
//       reply.code(201).send(allSchedules);

//     } catch (error) {

//       console.error(error);
//       reply.code(500).send(HttpResponse.serverError)

//     }
//   })

//   fastify.get('/schedules/:name', async (request, reply) => {
//     try {
//       const { name } = Object(request.params)
//       console.log(request.params)
//       if(!name) return reply.code(404).send("Nenhuma task task encontrada.")
//       const allSchedulesByName = await repository.getScheduleByName(name);
//       reply.code(201).send(allSchedulesByName)
//     } catch (error) {

//       console.error(error)
//       reply.code(500).send(HttpResponse.serverError)

//     }
//   })

//   fastify.put('/schedule/:id', async (request, reply) => {  
//     try {
//       const { id }  = Object(request.params)

//       const body = createScheduleSchema.parse(request.body)

//       if (!body.name) {
//         reply.code(400).send(new MissingParamError('name'));
//         return;
//       }

//       const updateSchedule = await repository.updateSchedule(id, body)
//       reply.code(201).send(updateSchedule)

//     } catch (error) {

//       console.error(error);
//       reply.code(500).send(HttpResponse.serverError)

//     }
//   });

//   fastify.delete('/schedule/:id', async (request, reply) => {
//     try {

//       const { id } = Object(request.params)
//       const deletedSchedule = await repository.deleteSchedule(id)
//       reply.code(201).send(deletedSchedule);

//     } catch (error) {

//       console.error(error);
//       reply.code(500).send(HttpResponse.serverError)

//     }
//   });
//   done();
// };

// export default routes;
