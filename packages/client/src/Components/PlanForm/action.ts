'use server'

const getFormPlanValues = (formData): { name: string; duration: number } => {
  return {
    name: formData.get('planName'),
    duration: +formData.get('planDuration'),
    userId: '22',
  }
}
export const addPlan = async (prevState, formData): Promise<any> => {
  // return await fetch(API_URL + 'plans', {
  //   method: 'POST',
  //   body: JSON.stringify(getFormPlanValues(formData)),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(async (data) => {
  //   const deita = prevState
  //   return deita
  // })
  // let newState = { ...prevState }
  // for (const [key, value] of formData.entries()) {
  //   if (typeof +key === 'number' && !isNaN(+key)) {
  //     const newItem: Item = {
  //       requiresFulfillment: true,
  //       isReady: false,
  //       text: value,
  //     }
  //     newState = {
  //       ...newState,
  //       steps: [
  //         ...newState.steps.map((step, index) => {
  //           if (index === +key) {
  //             return {
  //               ...step,
  //               items: [...step.items, newItem],
  //             }
  //           }
  //           return step
  //         }),
  //       ],
  //     }
  //   } else {
  //     newState = { ...newState, [key]: value }
  //   }
  // }
  // console.log(newState.steps)
  // return newState
  for (const [key, value] of formData.entries()) {
    console.log(key, value)
  }
}
