// hooks/usePaginatedTodos.ts
import { useAuthQuery } from './useAuthQuery';

interface User {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
}

interface UsePaginatedTodosProps {
  page: number;
  limit: number;
  loggedInUser: User;
}

export const usePaginatedTodos = ({ page, limit, loggedInUser }: UsePaginatedTodosProps) => {
  return useAuthQuery({
    queryKey: ['todos', page.toString(), limit.toString()],
    url: `/users/me?populate=todos&pagination[page]=${page}&pagination[pageSize]=${limit}`,
    config: {
      headers: {
        Authorization: `Bearer ${loggedInUser?.jwt}`
      }
    }
  });
};