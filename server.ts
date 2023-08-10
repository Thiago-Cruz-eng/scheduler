import fastify from 'fastify';
import routes from "./src/presentation/features/taskController"
import setupCronJobs from './src/presentation/jobs/worker';


const server = fastify()

server.register(routes)

const start = async () => {
  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const cron = new setupCronJobs()
    cron.worker()
    console.log(`Server listening at ${address}`)
  })
}

start();