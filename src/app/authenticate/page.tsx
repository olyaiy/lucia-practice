import TabSwitcher from '@/components/ui/TabSwitcher'
import React from 'react'

const AuthenticatePage = () => {
  return (
    <div className="relative flex w-full h-screen bg-background">
      <div className="max-w-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <TabSwitcher
      SignInTab={<div>Sign In</div>}
      SignUpTab={<div>Sign Up</div>}
      />
      </div>
    </div>
  )
}

export default AuthenticatePage


