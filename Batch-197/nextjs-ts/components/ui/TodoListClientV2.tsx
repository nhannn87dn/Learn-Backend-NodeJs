'use client'

import { use } from "react";

type TTodo = {
  id: number;
  todo: string;
  completed: boolean;
}


const TodoListClientV2 = ({todos}: {todos: Promise<TTodo[]>}) => {
    const allTodos = use(todos);

    console.log('<<=== 🚀 allTodos ===>>',allTodos);

    //TODO: render todos list
  return (
    <div>TodoListClientV2</div>
  )
}

export default TodoListClientV2