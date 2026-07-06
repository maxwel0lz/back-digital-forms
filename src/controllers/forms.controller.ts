import {FastifyReply, FastifyRequest } from "fastify";
import { formsCreateSchema, formsUpdateSchema } from "../schema/forms.input.schema";
import { FormsService } from "../services/forms.service";
import { z, ZodError } from "zod";
import { AppError } from "../error/AppError";

export async function createForms(request:FastifyRequest, reply: FastifyReply){
    
       
        const payload = formsCreateSchema.parse(request.body)
        console.log(payload)
        if (!payload) {
            throw new AppError(400, "Invalid request payload");
        }
        // COLOCAR VALIDADORES DE ERRO NO RESTO DAS FUNÇÕES DE CONTROLLER
        
        const formsService = new FormsService()

        const forms = await formsService.executeCreateForms(payload)

        reply.status(201).send(forms)
    
}

export async function getForms(request:FastifyRequest, reply: FastifyReply){
    const formsService = new FormsService()
    const form = await formsService.executeGetForms()
    
    reply.status(200).send(form)
}

export async function updateForms(request:FastifyRequest, reply:FastifyReply) {
    try {   
        const {id} = request.params as {id: number}
        const payload = formsUpdateSchema.parse(request.body)
        
        const formsService = new FormsService()

        const formsUpdate = await formsService.executeUpdateForms(id,payload)
        reply.send(formsUpdate)
    }
    catch (error){
        if(error instanceof z.ZodError){
            console.error(error.message)
            return reply.status(400).send(error.issues)
        }

        console.error(error);

        return reply.status(500).send({
            message: "Erro interno do servidor"
        });
    }
}