import { FastifyInstance } from "fastify";
import { createForms, deleteForms, getForms, updateForms,  } from "../controllers/forms.controller";


export async function formRouter(app: FastifyInstance) {
    
    // POST
    app.post("/forms", createForms );
    
    // GET
    app.get("/forms", getForms );

    //PUT
    app.put("/forms/:id", updateForms );

    //DELETE
    app.delete("/forms/:id", deleteForms );
}