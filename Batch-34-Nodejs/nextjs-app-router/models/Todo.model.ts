import {Schema, model, models} from 'mongoose'

export interface ITodo{
  title: string
  completed: boolean
}

/* TodoSchema will correspond to a collection in your MongoDB database. */
const TodoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: [true, 'Please provide a name for this Todo.'],
    maxLength: [60, 'Name cannot be more than 60 characters'],
  },
  completed: {
    type: Boolean,
    enum: ['true', 'false'],
    default: false
  }
},
{
  timestamps: true
}

)

const Todo = models.Todo || model<ITodo>('Todo', TodoSchema);

export default Todo;