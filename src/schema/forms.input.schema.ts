import { z }from "zod"; 

// Data entry schemes for forms
export const FieldsSchema = z.object({
    label: z.string().min(2).max(100),
    type: z.enum(['text', 'email', 'number']),
    required: z.boolean().default(false)
})

export const formsCreateSchema = z.object({
    title: z.string().min(3),
    fields: z.array(FieldsSchema)
})

export const formsUpdateSchemaParams = z.object({
    id: z.coerce.number().int().positive()
})
export const formsUpdateSchema = z.object({
    title: z.string().min(3),
    fields: z.array(FieldsSchema)
})

export type FormsCreateSchemaType = z.infer<typeof formsCreateSchema>
export type FormsUpdateSchemaType = z.infer<typeof formsUpdateSchema>
export type FormsUpdateSchemaParamsType = z.infer<typeof formsUpdateSchemaParams>