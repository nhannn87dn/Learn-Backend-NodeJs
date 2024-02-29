'use client'

import React from 'react'
import { createTodo } from '@/actions/todo';
import { SubmitButton } from '@/app/ui/SubmitButton';

export default function Page() {
  const [task,setTask] = React.useState("");
  

  return (
    <form action={async  (formData: FormData)=>{
        const result = await createTodo(formData);
        console.log(result);
    }}>
        <input placeholder="todo task" className="py-2 px-3 border rounded" type="text" name="title" />
        <SubmitButton />
    </form>
  )
}