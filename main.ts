import fastify from 'fastify'
import { route } from './src/presentation/routes/routes'
import SetupCronJobs from './src/presentation/jobs/worker'

const server = fastify()

server.register(route)

const start = async (): Promise<any> => {
  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const cron = new SetupCronJobs()
    cron.worker()
    console.log(`Server listening at ${address}`)
  })
}

start()
