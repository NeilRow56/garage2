import { BackButton } from '@/components/back-button'
import { getCustomer } from '@/lib/queries/getCustomer'
import * as Sentry from '@sentry/nextjs'
import CustomerForm from './customer-form'
//METADATA

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { customerId } = await searchParams

  if (!customerId) return { title: 'New Customer' }

  return { title: `Edit Customer #${customerId}` }
}

export default async function CustomerFormPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId } = await searchParams

    // Edit customer form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return (
          <>
            <h2 className='mb-2 text-2xl'>
              Customer ID #{customerId} not found
            </h2>
            <BackButton title='Go Back' variant='default' />
          </>
        )
      }

      // edit customer form component
      return <CustomerForm customer={customer} />
    } else {
      // new customer form component
      return <CustomerForm />
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
