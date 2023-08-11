import fastify from 'fastify'
import { route } from './src/presentation/routes/routes'
import SetupCronJobs from './src/presentation/jobs/worker'
import TaskSchedulerRepository from './src/data/taskScheduler/repository/scheduler/taskSchedulerRepository'
import { HttpRequest } from './src/presentation/axios/HttpRequest'

const server = fastify()

server.register(route)

const start = async (): Promise<any> => {
  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const cron = new SetupCronJobs(new TaskSchedulerRepository(), new HttpRequest())
    cron.worker()
    console.log(`Server listening at ${address}`)
  })
}

start()
