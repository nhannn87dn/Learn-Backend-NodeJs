'use client'
 
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button className='py-2 px-4 rounded bg-indigo-500 text-white' type='submit' disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
  )
}