import TodoListClientV2 from '@/components/ui/TodoListClientV2'
import { Suspense } from 'react'

//hàm gọi API như bình thường
 const fetchTodos = async()=>{
      const response = await fetch(`https://dummyjson.com/todos?limit=3&skip=0`);
      const data = await response.json()
      return data.todos
    };
/*
Về bản chất đang fetch dữ liệu từ server component
Sau đó truyến xuống cho client Component là con
*/

const Page = () => {
    // Don't await the data fetching function
    const todos = fetchTodos();
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <TodoListClientV2 todos={todos} />
    </Suspense>
  )
}

export default Page