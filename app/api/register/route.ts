// define the route.ts ?? 
import { signupSchema } from "@/lib/schema";
import { NextRequest} from "next/server";
import bcrypt from "bcrypt"
import { db } from "@/lib/prisma";

export async function POST(req:NextRequest)
{
    // POST /api/register
    const body  = await req.json();
    const {username,email, password} = body;
    const { success,error } = signupSchema.safeParse(body);

    if(!success)
    {
        return  new Response(JSON.stringify({name,password}),{
            status: 403,
        })

    }

    // hash the password
    const hashpswd = await bcrypt.hash(password,10); //SALT-rounds = 10
    // store it in the DB, but before that check if the user already exists,

    // find the user through email
    const user = await db.user.findUnique({
        where: {
            email:email
        }
    })

    if(user)
    {
        return new Response(JSON.stringify({
            "message":"User already exists, Register with new credentials",
            "exists":true
        }))
    }
    await db.user.create({
        data:{
            username:username,
            email:email,
            password:hashpswd
        }
    })

    return new Response(JSON.stringify({
        "username":username,
        "message":"Succesfully created! "
    }),{
        status:200
    })

}