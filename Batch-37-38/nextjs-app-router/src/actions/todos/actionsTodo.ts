'use server'
import { sql } from '@vercel/postgres'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
export async function getTodos() {
    try {
        const data =  await sql`
        SELECT * FROM todos
        `
        return { data, message: `success` }
      } catch (e) {
        return { message: 'Failed to get all todos' }
      }
}

export async function createTodo(prevState: any, formData: FormData) {
    const schema = z.object({
      title: z.string().nonempty(),
      id: z.string(),
    })
    const data = schema.parse({
        id: formData.get('id'), //id tên của input name=id
        title: formData.get('title'),
    })
  
    try {
      await sql`
      INSERT INTO todos (id,title)
      VALUES (${data.id}, ${data.title})
    `
        
      revalidatePath('/todos') // làm tươi lại đường dẫn
      return { ok: true, message: `Added todo ${data.title}` }
    } catch (e) {
      return { ok: false, message: 'Failed to create todo' }
    }
  }


  export async function deleteTodo(prevState: any, formData: FormData) {
    const schema = z.object({
      id: z.string().nonempty(),
    })
    const data = schema.parse({
      id: formData.get('id')
    })
  
    try {
      await sql`
        DELETE FROM todos
        WHERE id = ${data.id};
      `
  
      revalidatePath('/todos')
      return { ok: true, message: `Deleted todo ${data.id}` }
    } catch (e) {
      return {ok: false, message: 'Failed to delete todo' }
    }
  }