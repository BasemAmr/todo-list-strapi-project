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
  

  
interface Todo {
    id: string;
    documentId: string;
    title: string;
    description: string;
    completed: boolean;
    user: number[];
}
  
interface MutationContext {
    previousTodos: Todo[] | undefined;
}



interface UseAddTodoProps {
  instance: AxiosInstance;
  loggedInUser: User;
  onSuccess?: () => void;
}

export const useRemoveTodo = ({ 
  instance, 
  loggedInUser, 
  onSuccess 
}: UseAddTodoProps) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, string, MutationContext>({
    mutationFn: async (documentId) => {

      const { data } = await instance.delete(`/todos/${documentId}`, {
        headers: {
          Authorization: `Bearer ${loggedInUser.jwt}`
        }
      });

      return data;
    },

    onMutate: async (documentId) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ['todos']
      });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);


      // Optimistically update the cache by removing the todo with the given documentId
      queryClient.setQueryData<Todo[]>(
        ['todos'], 
        (old = []) => old.filter(todo => todo.documentId !== documentId)
      );

      return { previousTodos };
    },

    onError: (error, variables, context) => {
      // If the mutation fails, roll back to the previous state
      if (context) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      toast.error('Failed to remove todo');
      console.error('Error removing todo:', error);
    },

    onSuccess: () => {
      toast.success('Todo removed successfully');
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