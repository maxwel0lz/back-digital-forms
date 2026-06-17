import {FastifyReply, FastifyRequest } from "fastify";
import { FormsSchema } from "../schema/input.schema";
import { FormsService } from "../services/forms.service";

export async function createForms(request:FastifyRequest, reply: FastifyReply){
    const {title, fields} = FormsSchema.parse(request.body)
    console.log(title, fields)
    
    const formsService = new FormsService()

    const forms = await formsService.executeCreateForms({title, fields})

    reply.status(201).send(forms)

    
}
export async function getForms(request:FastifyRequest, reply: FastifyReply){
    
    reply.send(
        {
            id: "1",
            title: "Sla",
            fields: {"id":"1", "name": "slsa"}
        }
    )
    
}

export async function chargeForms(request:FastifyRequest, reply:FastifyReply) {
    reply.send({})
}