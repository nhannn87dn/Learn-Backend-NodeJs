import { getTodos } from "@/actions/todos/actionsTodo";
import AddTodoForm from "@/components/ui/AddTodoForm";
import { DeleteForm } from "@/components/ui/DeleteTodoForm";

const TodosPage = async () => {
    const {data, message} = await getTodos();
    console.log('<<=== 🚀 todos ===>>',data);

   
  return (
    <div>
        <h2 className="text-3xl">Todos List</h2>
        <ul>
            {
                data?.rows.map((todo)=>{
                return <li className="flex gap-x-5" key={todo.id}>
                        {todo.title} - <DeleteForm id={todo.id} />
                </li>
                })
            }
        </ul>
        <h2 className="text-3xl">Create new a Todo</h2>
        <AddTodoForm />
    </div>
  )
}

export default TodosPage