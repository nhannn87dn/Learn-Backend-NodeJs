"use server"

import connectDB from "@/db/dbConnect";
import Todo from "@/models/Todo.model";

type TodoRepository = {
  _id: string;
  title: string;
  completed: boolean
}

//Chạy hàm này trước để kết nối server mongoDB 
connectDB();

export async function getTodos() {
    try {
        //Lất all todos
        const todos: TodoRepository[] = await Todo.find();

        console.log(todos);
      
      return { ok: true,todos };
    } catch (error) {
      return { ok: false,error };
    }
  }

  export async function createTodo(formData: FormData) {

    try {
      console.log(formData.get('title'));
        // await connectDB();
        const todo = await Todo.create({
          title: formData.get('title')
       });
      //  revalidatePath('/todos')
      return {ok: true,todo};
    } catch (error) {
      return { ok: false, error };
    }
  }