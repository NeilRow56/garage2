import { Column } from '@tanstack/react-table'
import { DebouncedInput } from './debounced-input'

type Props<T> = {
  column: Column<T, unknown>
}

export default function Filter<T>({ column }: Props<T>) {
  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort()

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
        placeholder={`Search... (${[...column.getFacetedUniqueValues()].filter(arr => arr[0]).length})`}
        className='bg-card w-full rounded border shadow'
        list={column.id + 'list'}
      />
    </>
  )
}
