import * as React from 'react'

interface Props {
  label: string
  fieldName: string
  placeholder: string
  defaultValue: string | undefined | number | null
  errors: Array<string | undefined> | undefined
}
const HeaderInput = ({
  label,
  fieldName,
  placeholder,
  defaultValue,
  errors,
}: Props): React.JSX.Element => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.select()
  }
  return (
    <>
      <label htmlFor={fieldName} className="mb-2">
        Enter plan {label}
      </label>
      <input
        className="outline-0 w-4/12 mb-4 px-1 py-1 border-2 focus:outline-2 focus:outline-emerald-500 rounded-lg border-amber-200"
        type="text"
        name={fieldName}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
        onFocus={handleFocus}
      />
      {errors?.map((error: string | undefined, index) => {
        return <div key={index}>{error}</div>
      })}
    </>
  )
}

export default HeaderInput
