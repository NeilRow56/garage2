'use client'

import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Checkbox } from '@/components/ui/checkbox'

type Props<S> = {
  fieldTitle: string
  nameInSchema: keyof S & string
  message: string
  disabled?: boolean
}

export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
  disabled = false
}: Props<S>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className='flex w-full items-center gap-2'>
          <FormLabel className='w-1/3 py-2 text-base' htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <div className='flex items-center gap-2'>
            <FormControl>
              <Checkbox
                id={nameInSchema}
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className='border-gray-800 dark:border-gray-200'
              />
            </FormControl>
            {message}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
