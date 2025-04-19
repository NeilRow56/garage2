import { getCustomerSearchResults } from '@/lib/queries/getCustomerSearchResults'
import CustomerSearch from './customer-search'

export const metadata = {
  title: 'Customer Search'
}

export default async function Customers({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { searchText } = await searchParams

  if (!searchText) return <CustomerSearch />

  const results = await getCustomerSearchResults(searchText)

  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  )
}
