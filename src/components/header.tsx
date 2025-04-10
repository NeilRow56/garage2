import { HomeIcon, File, UsersRound } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { NavButton } from './nav-button'
import { NavButtonMenu } from './nav-button-menu'
import { ModeToggle } from './mode-toggle'

export function Header() {
  return (
    <header className='animate-slide bg-background sticky top-0 z-20 h-12 border-b p-2'>
      <div className='flex h-8 w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <NavButton href='/tickets' label='Home' icon={HomeIcon} />

          <Link
            href='/home'
            className='ml-0 flex items-center justify-center gap-2'
            title='Home'
          >
            <h1 className='m-0 mt-1 hidden text-xl font-bold sm:block'>
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className='flex items-center'>
          <NavButton href='/tickets' label='Tickets' icon={File} />
          <NavButtonMenu
            icon={UsersRound}
            label='Customers Menu'
            choices={[
              { title: 'Search Customers', href: '/customers' },
              { title: 'New Customer', href: '/customers/form' }
            ]}
          />
          <ModeToggle />
          <Button
            variant='ghost'
            size='icon'
            aria-label='LogOut'
            title='LogOut'
            className='rounded-full'
            asChild
          >
            LogOUT
          </Button>
        </div>
      </div>
    </header>
  )
}
