// build reusable custom hook with its interface
/*
const { data, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const { data } = await instance.get('/users/me?populate=todos', {
                headers: {
                    Authorization: `Bearer ${loggedInUser.jwt}`
                }
            });
            return data;
        }
    });

*/

import { useQuery } from '@tanstack/react-query';
import { instance } from '../config/axios.config';
import { AxiosRequestConfig } from 'axios';

interface UseAuthQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
}

export const useAuthQuery = ({ queryKey, url, config }: UseAuthQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const { data } = await instance.get(url, {
                ...config
            });
            return data;
        }
    });
}