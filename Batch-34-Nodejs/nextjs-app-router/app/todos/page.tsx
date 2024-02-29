import { Metadata } from 'next'
import { getTodos } from '@/actions/todo'
import { ITodo } from '@/models/Todo.model';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Todos List Page',
}

export default async function Pages() {

  const res = await getTodos();
  const todos = res.todos;

  return (
    <main className="">
      <h1><Link className='text-2xl font-bold' href={`todos/add`}>Add Todos</Link></h1>

      <ul>
        {
          todos && todos.map((todo,index)=>{
            return (
              <li key={index}>{todo.title}</li>
            )
          })
        }
      </ul>
    </main>
  )
}
