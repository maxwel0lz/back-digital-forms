import {FastifyReply, FastifyRequest } from "fastify";
import { formsCreateSchema, formsUpdateSchema, formsUpdateSchemaParams } from "../schema/forms.input.schema";
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
    
    const formsService = new FormsService()

    const {id} = formsUpdateSchemaParams.parse(request.params)
    
    
    const payload = formsUpdateSchema.parse(request.body)
    

    const formsUpdate = await formsService.executeUpdateForms(id,payload)
    if(!formsUpdate){
        throw new AppError(404, "Form not found")
    }

    reply.send(formsUpdate)
    
    
}

export async function deleteForms(request:FastifyRequest, reply:FastifyReply) {
    const formsService = new FormsService()
    const {id} = formsUpdateSchemaParams.parse(request.params)

    await formsService.executeDeleteForms(id)

    
    reply.status(204).send()
    

}