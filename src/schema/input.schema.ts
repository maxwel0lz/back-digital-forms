import { z }from "zod"; 

export const FieldsSchema = z.object({
    label: z.string().min(2).max(100),
    type: z.enum(['text', 'email', 'number']),
    required: z.boolean().default(false)
})
export const FormsSchema = z.object({
    title: z.string().min(3),
    fields: z.array(FieldsSchema)
})


export type FormsSchemaType = z.infer<typeof FormsSchema>