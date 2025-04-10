import Link from 'next/link'

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${'/images/home-img.jpg'})`,
        backgroundSize: 'cover'
      }}
    >
      <main className='mx-auto flex h-dvh max-w-5xl flex-col justify-center text-center'>
        <div className='sm: mx-auto flex w-4/5 max-w-96 flex-col gap-6 rounded-xl bg-black/90 p-12 text-2xl text-white'>
          <h1 className='text-4xl font-bold'>
            Dan&apos;s Computer
            <br />
            Repair Shop
          </h1>
          <address>
            555 Gateway Lane
            <br />
            Kansas City, KS 5555
          </address>
          <p>Open Daily: 9am to 5pm</p>
          <Link className='hover:underline' href='tel:5555555555'>
            555-555-5555
          </Link>
          {/* <div className='mx-auto flex size-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent'></div> */}
          {/* <span className='relative mx-auto inline-flex size-4'>
            <span className='absolute h-full w-full animate-ping rounded-full bg-red-600 opacity-75'>
              <span className='relative size-4 rounded-full bg-red-600'></span>
            </span>
          </span> */}
          {/* <div className='mx-auto flex gap-6'>
            <span className='animate-wiggle inline-block text-2xl'>👋 </span>
            <span>Hi There!</span>
          </div> */}
          <div className='animate-fadeIn'>...Modal Container</div>
        </div>
      </main>
    </div>
  )
}
