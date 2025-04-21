'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType
} from '@/zod-schemas/ticket'
import { selectCustomerSchemaType } from '@/zod-schemas/customer'

import { useAction } from 'next-safe-action/hooks'
import { saveTicketAction } from '@/app/actions/saveTicketAction'
import { toast } from 'react-toastify'
import { LoaderCircle } from 'lucide-react'
import { DisplayServerActionResponse } from '@/components/display-server-action-response'
import { InputWithLabel } from '@/components/form-inputs/InputWithLabel'
import { SelectWithLabel } from '@/components/form-inputs/SelectWithLabel'
import { CheckboxWithLabel } from '@/components/form-inputs/CheckboxWithLabel'
import { TextAreaWithLabel } from '@/components/form-inputs/TextAreaWithLabel'

type Props = {
  customer: selectCustomerSchemaType
  ticket?: selectTicketSchemaType
  techs?: {
    id: string
    description: string
  }[]
  isEditable?: boolean
  isManager?: boolean | undefined
}

export default function TicketForm({
  customer,
  ticket,
  techs,
  isEditable = true,
  isManager = false
}: Props) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id ?? '(New)',
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech.toLowerCase() ?? 'new-ticket@example.com'
  }

  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues
  })

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      if (data?.message) {
        if (data?.message) {
          toast.success('Success! 🎉')
        }
      }
    },
    onError({ error }) {
      toast.error('Something went wrong!')
    }
  })

  async function submitForm(data: insertTicketSchemaType) {
    executeSave(data)
  }

  return (
    <div className='flex flex-col gap-1 sm:px-8'>
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className='text-2xl font-bold'>
          {ticket?.id && isEditable
            ? `Edit Ticket # ${ticket.id}`
            : ticket?.id
              ? `View Ticket # ${ticket.id}`
              : 'New Ticket Form'}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className='flex flex-col gap-4 md:flex-row md:gap-8'
        >
          <div className='flex w-full max-w-xs flex-col gap-4'>
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle='Title'
              nameInSchema='title'
              disabled={!isEditable}
            />

            {isManager && techs ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle='Tech ID'
                nameInSchema='tech'
                data={[
                  {
                    id: 'new-ticket@example.com',
                    description: 'new-ticket@example.com'
                  },
                  ...techs
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle='Tech'
                nameInSchema='tech'
                disabled={true}
              />
            )}

            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle='Completed'
                nameInSchema='completed'
                message='Yes'
                disabled={!isEditable}
              />
            ) : null}

            <div className='mt-4 space-y-2'>
              <h3 className='text-lg'>Customer Info</h3>
              <hr className='w-4/5' />
              <p>
                {customer.firstName} {customer.lastName}
              </p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>
                {customer.city}, {customer.state} {customer.zip}
              </p>
              <hr className='w-4/5' />
              <p>{customer.email}</p>
              <p>Phone: {customer.phone}</p>
            </div>
          </div>

          <div className='flex w-full max-w-xs flex-col gap-4'>
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle='Description'
              nameInSchema='description'
              className='h-96'
              disabled={!isEditable}
            />

            {isEditable ? (
              <div className='flex gap-2'>
                <Button
                  type='submit'
                  className='w-3/4'
                  variant='default'
                  title='Save'
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className='animate-spin' /> Saving
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>

                <Button
                  type='button'
                  variant='destructive'
                  title='Reset'
                  onClick={() => {
                    form.reset(defaultValues)
                    resetSaveAction()
                  }}
                >
                  Reset
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  )
}
