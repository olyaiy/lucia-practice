'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { z } from 'zod' 
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'


export const signInSchema = z.object ({
    email : z.string().email(),
    password: z.string().min(8),
})


const SignInForm = () => {


    // 1. Define your form.
    const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

 
    

  return (
    <Card>
        <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
            <Form {...form} >
                <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='enter your email' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    ></FormField>
                     <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='enter your password' {...field}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim()
                                    field.onChange(e);
                                }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    ></FormField>
                    <Button type='submit' className='self-start'>
                        Login

                    </Button>
                </form>

            </Form>

        </CardContent>
    </Card>
  )
}

export default SignInForm
