
'use server'

import { z } from "zod"
import { signUpSchema } from "./SignUpForm"
import { prisma } from "@/lib/prisma"
import { Argon2id } from 'oslo/password'




export const signUp = async (values: z.infer<typeof signUpSchema>) => {
    console.log('i am running in the server with values:', values)
    try {
        // if uer already exists, throw an error
        const existingUser = await prisma.user.findUnique({
            where: {
                email: values.email
            }
        })
        if (existingUser) {
            return {error: 'User already exists', success: false}
        }

        // hash the password
        const hashedPassword = await new Argon2id().hash(values.password)


        // Create User Object
        const user = await prisma.user.create({
            data:{
                email: values.email.toLowerCase(),
                name: values.name,
                hashedPassword
            }
        })
    } catch (error) {
        
    }

}