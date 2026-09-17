import TodoListClient from "@/components/ui/TodoListClient"
/*
Server component có thể nhúng client component vào.
Nhưng ngược lại thì KHÔNG

*/
const TodoPage = () => {
  return (
    <div>
        <TodoListClient />
    </div>
  )
}

export default TodoPage