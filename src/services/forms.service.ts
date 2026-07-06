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
        
        const {fields,title} = payload
        const forms = await prisma.forms.update({
            where: {
                id
            },
            data: {
                title,
                fields
            }
        })
        return forms    
    }
}