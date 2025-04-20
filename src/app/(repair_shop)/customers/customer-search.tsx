import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/components/search-button'

// Form from 'next/form is useful for forms that update URL search params as it reduces the boilerplate code needed to achieve the above.

export default function CustomerSearch() {
  return (
    <Form action='/customers' className='flex items-center gap-2'>
      <Input
        name='searchText'
        type='text'
        placeholder='Search Customers'
        className='w-full'
        autoFocus
      />
      <SearchButton />
    </Form>
  )
}
