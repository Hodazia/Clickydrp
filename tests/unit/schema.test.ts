/*

Test the schemas defined in lib/schema.ts

*/

import  { signupSchema , signinSchema} from "../../lib/schema";
import  { describe , it, expect } from "vitest"


describe("Testing the zod schemas", () => {
    it("test the signup schema", ()=>{
        const payload = {
            username:"zia",
            email:"zia23hoda@gmail.com",
            password:"12345"
        }

        const parsedData = signupSchema.safeParse(payload);
        expect(parsedData.success).eq(true);
    })

    it("returns parsedData success as false", ()=>{ 
        const payload = {
            username:1212,
            email:"zia23hoda@gmail.com",
            password:"12345"
        }

        const parsedData = signupSchema.safeParse(payload);
        expect(parsedData.success).eq(false);
    })

    it("signin schema parsed data returns true", ()=>{
        const payload = {
            email:"zia23hoda@gmail.com",
            password:"12345"
        }

        const parsedData = signinSchema.safeParse(payload);
        expect(parsedData.success).eq(true);
    })

    it("signin schema parsed data returns false", ()=>{ 
        const payload = {
            email:12321,
            password:"12345"
        }

        const parsedData = signinSchema.safeParse(payload);
        expect(parsedData.success).eq(false);
    })

    
})
