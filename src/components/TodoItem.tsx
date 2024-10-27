import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Edit2, Trash2 } from "lucide-react";

interface Todo {
    id: number;
    documentId: string;
    title: string;
    description: string;
    completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  
  onEdit: (todo: Todo) => void;

  onRemove: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onEdit, onRemove }: TodoItemProps) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border border-gray-100"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-gray-400" />
            )}
            <h3 className={`font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 text-sm ml-8">{todo.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(todo)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );