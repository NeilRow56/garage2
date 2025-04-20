import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className='bg-background/80 fixed inset-0 z-50'>
      <div className='grid h-dvh w-full place-content-center'>
        <LoaderCircle className='text-foreground/20 h-48 w-48 animate-spin' />
      </div>
    </div>
  )
}
