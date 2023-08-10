/*import fastify from 'fastify';
import TaskSchedulerController from "@/presentation/features/taskController"
import setupCronJobs  from '@/presentation/jobs/worker';

const server = fastify()

const controller = new TaskSchedulerController();

controller.setupRoutes(server);

const start = async () => {
  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    new setupCronJobs()
    console.log(`Server listening at ${address}`)
  })
}

start();*/
import TaskSchedulerController from '@/presentation/features/taskController';
import setupCronJobs from './src/presentation/jobs/worker'
import fastify from 'fastify'

const server = fastify()

const controller = new TaskSchedulerController();

controller.setupRoutes(server);



server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const cron = new setupCronJobs()
  cron.worker()
  console.log(`Server listening at ${address}`)
})