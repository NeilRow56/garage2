export default async function Template({
  //Templates re render
  children
}: {
  children: React.ReactNode
}) {
  return <div className='animate-fadeIn'>{children}</div>
}
