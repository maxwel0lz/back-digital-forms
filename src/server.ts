import Fastify from "fastify"
import { formRouter } from "./router/forms.router"

export const app = Fastify()

app.register(formRouter)

app.get("/", async (request, reply) => {
  return { 
    hello: "world",
    nome: "Maxwell"
   }
})

app.listen({port: 3333,host: "0.0.0.0"}, (error, address) => {
    if (error) {
        console.error(error)
        process.exit(1)
    }
    console.log(`Server is running at ${address}`)
})