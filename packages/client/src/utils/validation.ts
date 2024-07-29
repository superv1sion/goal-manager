import { isNil } from 'ramda'

type Predicate<T> = (value: T) => boolean
type ValidationRule<T> = [Predicate<T>, string]
export interface ValidationResult {
  fieldName: string
  errors: Array<string | undefined>
}

const isNotNil = <T>(val: T): boolean => !isNil(val)
const validate = <T>(rules: Array<ValidationRule<T>>, value: T): Array<string | undefined> =>
  rules.map(([predicate, message]) => (predicate(value) ? undefined : message)).filter(isNotNil)

export const validateName = (planName: string): ValidationResult => {
  const errors: Array<string | undefined> = validate(
    [
      [(val: string) => val.length > 0, 'Name should be at least 1 character'],
      [(val: string) => isNotNil(val), 'Name should be defined'],
    ],
    planName
  )
  return { fieldName: 'planName', errors }
}

export const validateDuration = (duration: number): ValidationResult => {
  const errors: Array<string | undefined> = validate(
    [
      [(val: number) => isNotNil(val), 'Duration should be defined'],
      [(val: number) => !isNaN(val), 'Duration must be a number'],
      [(val: number) => val > 0, 'Duration must be positive'],
    ],
    duration
  )
  return { fieldName: 'planDuration', errors }
}
