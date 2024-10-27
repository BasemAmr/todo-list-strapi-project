import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus,  Search } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Import components and hooks from second implementation
import Button from './ui/Button';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import InputErrorMessage from './ui/InputErrorMessage';
import { TodoSchema } from '../validation';
import TodoSkeleton from './ui/TodoSkeleton';
import { useAddTodo } from '../hooks/useAddTodo';
import { usePaginatedTodos } from '../hooks/usePaginatedTodos';
import Paginator from './Paginator';
import { useRemoveTodo } from '../hooks/useRemoveTodo';
import { useUpdateTodo } from '../hooks/useUpdateTodo';
import { instance } from '../config/axios.config';
import { TodoItem } from './TodoItem';
import { EmptyState } from './EmptyState';
import { RadioGroup } from './RadioGroup';
// Interfaces
interface Todo {
  id: number;
  documentId: string;
  title: string;
  description: string;
  completed: boolean;
}

interface FormValues {
  title: string;
  description: string;
  completed: boolean;
}

// Get logged-in user from localStorage
const user = localStorage.getItem('loggedInUser');
const loggedInUser = user ? JSON.parse(user) : null;



const TodoList: React.FC = () => {
  // State management
  const [showModal, setShowModal] = useState(false);
  const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const ITEMS_PER_PAGE = 5;

  // Form setup
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: yupResolver(TodoSchema),
    defaultValues: {
      title: '',
      description: '',
      completed: false
    }
  });

  // Fetch todos
  const { data, isLoading } = usePaginatedTodos({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    loggedInUser
  });

  // Calculate stats
  const totalTodos = data?.todos?.length || 0;
  const completedTodos = data?.todos?.filter((todo: Todo) => todo.completed).length || 0;
  const pendingTodos = totalTodos - completedTodos;

  // Filter todos based on search
  const filteredTodos = data?.todos?.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const currentTodos = filteredTodos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Mutations
  const addTodoMutation = useAddTodo({
    instance,
    loggedInUser,
    onSuccess: () => {
      closeModal();
      setLoading(false);
    }
  });

  const updateTodoMutation = useUpdateTodo({
    instance,
    loggedInUser,
    onSuccess: () => {
      closeModal();
      setLoading(false);
    }
  });

  const removeTodoMutation = useRemoveTodo({
    instance,
    loggedInUser,
    onSuccess: () => {
      closeConfirmRemoveModal();
      setLoading(false);
    }
  });

  // Handlers
  const handlePageChange = (page: number) => setCurrentPage(page);

  const closeModal = () => {
    setShowModal(false);
    setTodoToEdit(null);
    reset();
  };

  const openModal = (todo?: Todo) => {
    if (todo) {
      setTodoToEdit(todo);
      reset({
        title: todo.title,
        description: todo.description,
        completed: todo.completed
      });
    } else {
      setTodoToEdit(null);
      reset();
    }
    setShowModal(true);
  };

  const openConfirmRemoveModal = (todo: Todo) => {
    setTodoToEdit(todo);
    setShowConfirmRemoveModal(true);
  };

  const closeConfirmRemoveModal = () => {
    setShowConfirmRemoveModal(false);
    setTodoToEdit(null);
  };

  const onSubmit = async (formData: FormValues) => {
    setLoading(true);
    if (todoToEdit) {
      updateTodoMutation.mutate({ ...formData, documentId: todoToEdit.documentId });
    } else {
      addTodoMutation.mutate(formData);
    }
  };

  const onRemove = async () => {
    if (!todoToEdit) return;
    setLoading(true);
    removeTodoMutation.mutate(todoToEdit.documentId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-2 dark:text-white"
        >
          My Tasks
        </motion.h1>
        <p className="text-gray-600 dark:text-gray-200">Keep track of your daily tasks and stay organized</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Tasks', value: totalTodos },
          { label: 'Completed', value: completedTodos },
          { label: 'Pending', value: pendingTodos }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        <AnimatePresence>
          {isLoading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <TodoSkeleton key={index} />
            ))
          ) : currentTodos.length > 0 ? (
            currentTodos.map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={() => openModal(todo)}
                onRemove={() => openConfirmRemoveModal(todo)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modals */}
      <Modal 
        isOpen={showModal} 
        closeModal={closeModal} 
        title={todoToEdit ? "Edit Todo" : "Add New Todo"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter title" />
              )}
            />
            {errors.title && <InputErrorMessage message={errors.title.message || ''} />}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Enter description" />
              )}
            />
            {errors.description && <InputErrorMessage message={errors.description.message || ''} />}
          </div>

          {todoToEdit && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Completed
              </label>
              <Controller
                name="completed"
                control={control}
                render={({ field }) => (
                  <RadioGroup value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          )}

          <div className="flex justify-end gap-5">
            <Button type="submit" variant="primary" size="md" isLoading={loading}>
              Save
            </Button>
            <Button type="button" variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showConfirmRemoveModal}
        closeModal={closeConfirmRemoveModal}
        title="Remove Todo"
      >
        <div className="flex flex-col gap-5">
          <p>Are you sure you want to remove this todo?</p>
          <div className="flex justify-end gap-5">
            <Button
              variant="danger"
              size="md"
              onClick={onRemove}
              isLoading={loading}
            >
              Remove
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={closeConfirmRemoveModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;