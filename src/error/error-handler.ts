import { FastifyInstance } from "fastify"
import { AppError } from "./AppError"
import { ZodError } from "zod"

export function registerErrorHandler(app:FastifyInstance){
    app.setErrorHandler((error, request, reply) => {
        if(error instanceof AppError){
            return reply.status(error.statusCode).send({
                message: error.message
            })

        }

        if(error instanceof ZodError){
            return reply.status(400).send({
                message: "Invalid request payload",
                erros: error.issues
            })
        }
        return reply.status(500).send({
            message: "Erro interno do servidor",
        });
    })
    
}