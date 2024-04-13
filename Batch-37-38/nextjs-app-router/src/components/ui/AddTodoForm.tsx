'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createTodo } from '@/actions/todos/actionsTodo'

const initialState = {
    message: null,
  }
  
  function SubmitButton() {
    const { pending } = useFormStatus()
  
    return (
      <button className='btn btn-primary' type="submit" aria-disabled={pending}>
        {pending ? 'Submiting': 'Add Todo'}
      </button>
    )
  }

const AddTodoForm = () => {
    const [state, formAction] = useFormState(createTodo, initialState)

  return (
    <form action={formAction}>
        <div>
        <label htmlFor="title">Enter Id</label>
            <input className='border rounded border-slate-200' type="text" id="id" name="id" required />
        </div>
        <div>
        <label htmlFor="title">Enter Title</label>
            <input className='border rounded border-slate-200' type="text" id="title" name="title" required />
        </div>
    <SubmitButton />
    <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
    </p>
    </form>
  )
}

export default AddTodoForm