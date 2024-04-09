'use server'
import { API_URL } from '../../constants/api';

export async function addPlan(prevState, formData): Promise<any> {
    const planName = formData.get('planName')
    const planDuration = formData.get('planDuration')

    return await fetch(API_URL + 'plans', {
        method: 'POST',
        body: JSON.stringify({ name: planName, userId: undefined }),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (data) => {
        return await data.json()
    })
}