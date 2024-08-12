import { isEmpty } from 'ramda'

import { Plan } from '@/types/plan'
import { validateDuration, validateName, ValidationResult } from '@/utils/validation'

export const updatePlanAction =
  (updatePlan: (plan: Plan) => void, plan: Plan) =>
  (
    _: any,
    formData: FormData
  ): { success: boolean; message: string; errors?: Record<string, ValidationResult> } => {
    const duration = parseInt(formData.get('planDuration') as string)
    const name = formData.get('planName') as string
    const errors = [validateName(name), validateDuration(duration)]
      .filter((validationResult) => !isEmpty(validationResult.errors))
      .reduce(
        (acc, validationResult) => ({ ...acc, [validationResult.fieldName]: validationResult }),
        {}
      )
    if (!isEmpty(errors)) {
      return { success: false, message: 'initiation failed', errors }
    }

    updatePlan({ ...plan, name, duration })
    return { success: true, message: 'plan initiated successfully' }
  }
