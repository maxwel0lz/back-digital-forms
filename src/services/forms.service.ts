import { prisma } from "../lib/prisma";
import { FormsSchemaType } from "../schema/input.schema";

export class FormsService {
    async executeCreateForms({title, fields}:FormsSchemaType) {
        const forms = await prisma.forms.create({
            data: {
                title,
                fields
            }
        })
        return forms 
    }
}