import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

const Header = () => {
  const { user, isSignedIn } = useUser()
  return (
    <div className='p-3 px-5 justify-between flex shadow-md'>
      <div >
      <NavLink to={'/'}>
      <img src="/ProjectLogo.svg" alt='logo' width={100} height={100} className='curser-pointer'/>
      </NavLink>
      </div>

      {isSignedIn ?
        <div className='flex gap-2 items-center '>
          <NavLink to={'/dashboard'}>
            <Button variant="outline">Dashboard</Button>
          </NavLink>
          <UserButton />
        </div> :
        <NavLink to={'/auth/sign-in'}>
          <Button>Get started</Button>
        </NavLink>
      }

    </div>
  )
}

export default Header
