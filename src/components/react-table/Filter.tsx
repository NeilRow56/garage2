import { Column } from '@tanstack/react-table'
import { DebouncedInput } from './debounced-input'

type Props<T> = {
  column: Column<T, unknown>
  filteredRows: string[]
}

export default function Filter<T>({ column, filteredRows }: Props<T>) {
  const columnFilterValue = column.getFilterValue()

  const uniqueFilteredValues = new Set(filteredRows)

  const sortedUniqueValues = Array.from(uniqueFilteredValues).sort()

  return (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${uniqueFilteredValues.size})`}
        className='bg-card w-full rounded border shadow'
        list={column.id + 'list'}
      />
    </>
  )
}
