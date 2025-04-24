import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useTheme } from '../../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const Header = () => {
  const { user, isSignedIn } = useUser()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='p-3 px-5 justify-between flex shadow-md dark:bg-gray-800 dark:text-white'>
      <div>
        <NavLink to={'/'}>
          <img src="/ProjectLogo.svg" alt='logo' width={100} height={100} className='cursor-pointer'/>
        </NavLink>
      </div>

      <div className='flex items-center gap-3'>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {isSignedIn ? (
          <div className='flex gap-2 items-center'>
            <NavLink to={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>
            </NavLink>
            <UserButton />
          </div>
        ) : (
          <NavLink to={'/auth/sign-in'}>
            <Button>Get started</Button>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Header

// about, contact us, light mode/dark mode,  