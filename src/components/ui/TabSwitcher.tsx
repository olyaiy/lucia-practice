'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'

type Props = {
    SignUpTab: React.ReactNode,
    SignInTab: React.ReactNode
}

const TabSwitcher = (proprs: Props) => {
  return (
    <Tabs className="max-w-[500px]">
        <TabsList>
            <TabsTrigger value='sign-up'>Sign Up</TabsTrigger>
            <TabsTrigger value='sign-in'>Sign In</TabsTrigger>
        </TabsList>

        <TabsContent value='sign-up'> {proprs.SignUpTab} </TabsContent>
        <TabsContent value='sign-in'> {proprs.SignInTab} </TabsContent>
            
    </Tabs>
  )
}

export default TabSwitcher
