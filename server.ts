import fastify from 'fastify';
import routes from "./src/presentation/features/taskController"


const server = fastify()

server.register(routes)

const start = async () => {
  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

start();