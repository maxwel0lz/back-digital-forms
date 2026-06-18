import { FastifyInstance } from "fastify";
import { createForms, getForms, updateForms,  } from "../controllers/forms.controller";


export async function formRouter(app: FastifyInstance) {
    
    // POST
    app.post("/forms", createForms );
    
    // GET
    app.get("/forms", getForms );

    //PUT
    app.put("/forms", updateForms );
}