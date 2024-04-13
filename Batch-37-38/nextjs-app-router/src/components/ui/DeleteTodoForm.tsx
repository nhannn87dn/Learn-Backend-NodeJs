'use client'

import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { deleteTodo } from '@/actions/todos/actionsTodo'

const initialState = {
  message: null,
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
       {pending ? 'Deleting...': 'Delete'}
    </button>
  )
}

export function DeleteForm({id} : {id: number}) {
  const [state, formAction] = useFormState(deleteTodo, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}