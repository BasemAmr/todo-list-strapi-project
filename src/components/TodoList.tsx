import React, { useState } from 'react';
import { useForm, Controller, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import Button from './ui/Button';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import InputErrorMessage from './ui/InputErrorMessage';
import { useAuthQuery } from '../hooks/useAuthQuery';
import { TodoSchema } from '../validation';
import { instance } from '../config/axios.config';

// Get logged-in user from localStorage
const user = localStorage.getItem('loggedInUser');
const loggedInUser = user ? JSON.parse(user) : null;

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

type FormFieldComponent = typeof Input | typeof Textarea | typeof RadioGroup;

// RadioGroup component for completed status
const RadioGroup: React.FC<{
    value: boolean | string;
    onChange: (value: boolean) => void;
  }> = ({ value, onChange }) => (
    <div className="flex items-center space-x-4">
      <label className="flex items-center w-full">
        <input
          type="radio"
          checked={value === true}
          onChange={() => onChange(true)}
          className="peer hidden"
        />
        <span className="peer-checked:bg-green-500 peer-checked:text-white px-4 py-2 rounded-full cursor-pointer transition duration-200 border border-gray-300 shadow-sm w-full text-center">
          Yes
        </span>
      </label>
      <label className="flex items-center w-full">
        <input
          type="radio"
          checked={value === false}
          onChange={() => onChange(false)}
          className="peer hidden"
        />
        <span className="peer-checked:bg-red-500 peer-checked:text-white px-4 py-2 rounded-full cursor-pointer transition duration-200 border border-gray-300 shadow-sm w-full text-center">
          No
        </span>
      </label>
    </div>
  );

// Main TodoList component
const TodoList: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: yupResolver(TodoSchema),
        defaultValues: {
            title: '',
            description: '',
            completed: false
        }
    });

    const [Loading, setLoading] = useState(false);

    // Fetch todos using custom hook
    const { data, isLoading } = useAuthQuery({
        queryKey: ['todos' , `${todoToEdit?.documentId}`],
        url: '/users/me?populate=todos',
        config: {
            headers: {
                Authorization: `Bearer ${loggedInUser?.jwt}`
            }
        }
    });

    const closeModal = () => {
        setShowModal(false);
        setTodoToEdit(null);
        reset();
    };

    const openModal = (todo: Todo) => {
        setShowModal(true);
        setTodoToEdit(todo);
        reset({
            title: todo.title,
            description: todo.description,
            completed: todo.completed
        });
    };

    const onSave = async (formData: FormValues) => {
        setLoading(true);
        try {
            // Convert the string 'true'/'false' to boolean
            const completedBoolean = formData.completed === true;
            
            // Prepare the data in the format expected by the API
            const requestData = {
                data: {
                    title: formData.title,
                    description: formData.description,
                    completed: completedBoolean
                }
            };

            const { status } = await instance.put(
                `/todos/${todoToEdit?.documentId}`, 
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${loggedInUser?.jwt}`
                    }
                }
            );

            if (status === 200) {
                toast.success('Todo updated successfully');
                closeModal();
            }
        } catch (error) {
            toast.error('Failed to update todo');
            console.error('Error updating todo:', error);
        } finally {
            setLoading(false);
        }
    };

    // Render form field helper function
    const renderFormField = (
        name: keyof FormValues,
        label: string,
        Component: FormFieldComponent,
        control: Control<FormValues>
      ) => (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              if (name === 'completed') {
                return (
                  <RadioGroup
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                );
              }
              return (
                <Component
                  id={name}
                  {...field}
                  value={typeof field.value === 'boolean' ? String(field.value) : field.value}
                  placeholder={label}
                />
              );
            }}
          />
          {errors[name] && <InputErrorMessage message={errors[name]?.message || ''} />}
        </div>
      );

    // Render todo item helper function
    const renderTodoItem = (todo: Todo) => (
        <div key={todo.id} className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200">
            <div className="flex-1 mb-2 sm:mb-0">
                <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {todo.title}
                </p>
                <p className="text-sm text-gray-600">{todo.description}</p>
            </div>
            <div className="flex flex-col space-y-4 items-center">
                <Button variant="success" size="md" onClick={() => openModal(todo)}>Edit</Button>
                <Button variant="danger" size="md">Remove</Button>
            </div>
        </div>
    );

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">Todos</h1>
                    <div className="space-y-4">
                        {data?.todos?.length ? (
                            data.todos.map(renderTodoItem)
                        ) : (
                            <p className="text-center">No todos found</p>
                        )}
                    </div>
                </div>
            )}
            <Modal isOpen={showModal} closeModal={closeModal} title="Edit Todo">
                <form onSubmit={handleSubmit(onSave)} className='flex flex-col gap-5'>
                {renderFormField('title', 'Title', Input, control)}
                {renderFormField('description', 'Description', Textarea, control)}
                {renderFormField('completed', 'Completed', RadioGroup, control)}
                <div className="flex justify-end gap-5">
                    <Button type='submit' variant="primary" size="md" isLoading={Loading}>Save</Button>
                    <Button variant="secondary" size="md" onClick={closeModal}>Cancel</Button>
                </div>
                </form>
            </Modal>
        </>
    );
};

export default TodoList;