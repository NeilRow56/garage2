import { getCustomer } from '@/lib/queries/getCustomer'
import { getTicket } from '@/lib/queries/getTicket'
import { BackButton } from '@/components/back-button'
import * as Sentry from '@sentry/nextjs'
import TicketForm from './ticket-form'

//METADATA

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { customerId, ticketId } = await searchParams

  if (!customerId && !ticketId)
    return {
      title: 'Missing Ticket ID or Customer ID'
    }

  if (customerId)
    return {
      title: `New Ticket for Customer #${customerId}`
    }

  if (ticketId)
    return {
      title: `Edit Ticket #${ticketId}`
    }
}

export default async function TicketFormPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  try {
    const { customerId, ticketId } = await searchParams
    //he logical AND (&&) (logical conjunction) operator for a set of boolean operands will be true if and only if all the operands are true.
    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className='mb-2 text-2xl'>
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <BackButton title='Go Back' variant='default' />
        </>
      )
    }
    // New ticket form
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
      if (!customer.active) {
        return (
          <>
            <h2 className='mb-2 text-2xl'>
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title='Go Back' variant='default' />
          </>
        )
      }

      // return ticket form
      console.log(customer)
      return <TicketForm customer={customer} />
    }
    // edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId))

      if (!ticket) {
        return (
          <>
            <h2 className='mb-2 text-2xl'>Ticket ID #{ticketId} not found</h2>
            <BackButton title='Go Back' variant='default' />
          </>
        )
      }

      const customer = await getCustomer(ticket.customerId)

      // Ticket form
      console.log('ticket: ', ticket)
      console.log('customer:', customer)
      return <TicketForm customer={customer} ticket={ticket} />
    }
  } catch (error) {
    if (error instanceof Error) {
      Sentry.captureException(error)
      throw error
    }
  }
}
