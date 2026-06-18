import {FastifyReply, FastifyRequest } from "fastify";
import { formsCreateSchema, formsUpdateSchema } from "../schema/forms.input.schema";
import { FormsService } from "../services/forms.service";
import { z, ZodError } from "zod";

export async function createForms(request:FastifyRequest, reply: FastifyReply){
    try {
        console.log(typeof(request.body))
        const {title, fields} = formsCreateSchema.parse(request.body)
        console.log(title, fields)
        
        const formsService = new FormsService()

        const forms = await formsService.executeCreateForms({title, fields})

        reply.status(201).send(forms)
    } catch (error){
        if(error instanceof z.ZodError){
            console.error(error.message)
            reply.status(400)
        } 
    }
}

export async function getForms(request:FastifyRequest, reply: FastifyReply){
    const formsService = new FormsService()
    const form = await formsService.executeGetForms()
    
    reply.status(200).send(form)
}

export async function updateForms(request:FastifyRequest, reply:FastifyReply) {
    try {
        console.log(typeof(request.body))
        const data = formsUpdateSchema.parse(request.body)
        const formsService = new FormsService()
        
        const formsUpdate = await formsService.executeUpdateForms(data)
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