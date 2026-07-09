import { AppError } from "../error/AppError";
import { prisma } from "../lib/prisma";
import { FormsCreateSchemaType, FormsUpdateSchemaType } from "../schema/forms.input.schema";

export class FormsService {
    async executeCreateForms(payload:FormsCreateSchemaType) {
        
        const forms = await prisma.forms.create({
            data: {
                title: payload.title,
                fields: payload.fields
            }
        })
        return forms 
    }

    async executeGetForms() {
        const forms = await prisma.forms.findMany()
        console.log(forms);
        
        return forms
    }



    async executeUpdateForms( id: number, payload:FormsUpdateSchemaType){
        
        const formExists = await prisma.forms.findUnique({
            where: {
                id
            }
        })

        if(!formExists){
            throw new AppError(404, "Form not found")
        }
        
        const {fields,title} = payload
        
        return await prisma.forms.update({
            where: {
                id
            },
            data: {
                title,
                fields
            }
        })   
    }

    async executeDeleteForms(id: number) {
        const formExists = await prisma.forms.findUnique({
            where: {
                id
            }
        })

        if(!formExists){
            throw new AppError(404, "Form not found")
        }

        return await prisma.forms.delete({
            where: {
                id
            }
        })
    }
}