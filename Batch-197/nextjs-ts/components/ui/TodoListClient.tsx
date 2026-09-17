'use client'

import { useEffect, useState } from "react"

type TTodo = {
  id: number;
  todo: string;
  completed: boolean;
}


const TodoListClient = () => {
  const [todos,setTodos] = useState<TTodo[]>([]);

  useEffect(()=>{
    const fetchTodos = async()=>{
      const response = await fetch(`https://dummyjson.com/todos?limit=3&skip=0`);
      const data = await response.json()

      console.log('<<=== 🚀 data ===>>',data);

      setTodos(data.todos);
    };

    fetchTodos();

  }, []);

  console.log('<<=== 🚀 todos ===>>',todos);

  return (
    <div>TodoListClient</div>
  )
}

export default TodoListClient