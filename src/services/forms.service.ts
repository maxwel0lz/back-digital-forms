import { prisma } from "../lib/prisma";
import { FormsCreateSchemaType, FormsUpdateSchemaType } from "../schema/forms.input.schema";

export class FormsService {
    async executeCreateForms({title, fields}:FormsCreateSchemaType) {
        const forms = await prisma.forms.create({
            data: {
                title,
                fields
            }
        })
        return forms 
    }

    async executeGetForms() {
        const forms = await prisma.forms.findMany()
        console.log(forms);
        
        return forms
    }

    async executeUpdateForms( data :FormsUpdateSchemaType){
        console.log(typeof(data.id));
        const {id,fields,title} = data
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