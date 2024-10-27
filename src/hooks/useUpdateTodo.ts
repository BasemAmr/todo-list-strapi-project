import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import  { AxiosInstance } from 'axios';

interface User {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}
  
interface FormValues {
    title: string;
    description: string;
    completed: boolean;
    documentId: string;
}
  
interface Todo {
    title: string;
    description: string;
    completed: boolean;
    user: number[];
}
  
interface MutationContext {
    previousTodos: Todo[] | undefined;
    optimisticTodo: Todo;
}



interface UseAddTodoProps {
  instance: AxiosInstance;
  loggedInUser: User;
  onSuccess?: () => void;
}

export const useUpdateTodo = ({ 
  instance, 
  loggedInUser, 
  onSuccess 
}: UseAddTodoProps) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, FormValues, MutationContext>({
    mutationFn: async (formData) => {
      const requestData = {
        data: {
          title: formData.title,
          description: formData.description,
          completed: formData.completed,
          user: [loggedInUser.user.id],
        }
      };

      const { data } = await instance.put<Todo>(`/todos/${ formData.documentId}`, requestData, {
        headers: {
          Authorization: `Bearer ${loggedInUser.jwt}`
        }
      });

      return data;
    },

    onMutate: async (formData) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ['todos']
      });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Create an optimistic todo
      const optimisticTodo: Todo = {
        title: formData.title,
        description: formData.description,
        completed: formData.completed,
        user: [loggedInUser.user.id]
      };

      // Optimistically update the cache
      queryClient.setQueryData<Todo[]>(
        ['todos'], 
        (old = []) => [...old, optimisticTodo]
      );

      return { previousTodos, optimisticTodo };
    },

    onError: (error, variables, context) => {
      // If the mutation fails, roll back to the previous state
      if (context) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      toast.error('Failed to update todo');
      console.error('Error adding todo:', error);
    },

    onSuccess: () => {
      toast.success('Todo updated successfully');
      onSuccess?.(); // Call the optional success callback
    },

    onSettled: () => {
      // Refetch after error or success to ensure cache is synchronized
      queryClient.invalidateQueries({
        queryKey: ['todos']
      });
    }
  });
};