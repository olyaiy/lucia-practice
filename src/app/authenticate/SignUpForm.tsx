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
import { signUp } from './auth.action'
import { useRouter } from 'next/navigation'
import { Toast } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'


export const signUpSchema = z.object ({
    name: z.string().min(3),
    email : z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

const SignUpForm = () => {
    const router = useRouter();
    const { toast } = useToast()



    // 1. Define your form.
    const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    
  })

  // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        const res = await signUp(values)
        if (res.success) {
            toast({
                title: "Success",
                description: "Account created successfully",
            })
            router.push('/dashboard')

        } else {
            toast({
                title: "Error",
                description: res.error,
                variant: 'destructive'
            })
        }
        console.log(values)
    }

 
    

  return (
    <Card className='min-w-[500px]'>
        <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>Sign Up for an account</CardDescription>
        </CardHeader>
        <CardContent className='space-y-2'>
            <Form {...form} >
                <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                    
                    {/* Name */}
                    <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='enter your name' {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    >

                    </FormField>

                    {/* Email */}
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
                    >

                    </FormField>

                    {/* Password */}
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
                    >

                    </FormField>

                    {/* Confirm Password */}
                    <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder='Please confirm your password' {...field}
                                onChange={(e) => {
                                    e.target.value = e.target.value.trim()
                                    field.onChange(e);
                                }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    >
                      
                    </FormField>
                    <Button type='submit' className='self-start'>
                        Sign Up

                    </Button>
                </form>

            </Form>

        </CardContent>
    </Card>
  )
}

export default SignUpForm
