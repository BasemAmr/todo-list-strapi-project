import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import InputErrorMessage from '../components/ui/InputErrorMessage';
import { toast } from 'react-hot-toast';

import { LOGIN_FORM_FIELDS } from '../data';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation';

import { instance } from '../config/axios.config';
import { IErrorResponse } from '../interfaces';

import {  useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface LoginFormValues {
    identifier: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    // Form state management
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema)
    });

    const [loading, setLoading] = useState(false);

    // Navigation

    // Form submission handler
    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true);
        try {
            const { status , data: resData} = await instance.post('/auth/local/', data);
            if (status === 200) {
                toast.success('Account Logged In successfully, you will be redirected to HomePage page after 2 seconds');
                
                // Save data to local storage
                localStorage.setItem('loggedInUser', JSON.stringify(resData));


                // Redirect to login page
                setTimeout(() => {
                    location.replace('/');
                }, 2000);
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            const errorMessage = errorObj.response?.data.error.message || 'An error occurred';
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    // Render form fields
    const renderFormFields = () => {
        return LOGIN_FORM_FIELDS.map((field, idx) => (
            <div key={idx} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                    {field.label}
                </label>
                <Input id={field.name} type={field.type} placeholder={field.placeholder} {...register(field.name as keyof LoginFormValues)} />
                {errors[field.name as keyof LoginFormValues] && <InputErrorMessage message={errors[field.name as keyof LoginFormValues]?.message} />}
            </div>
        ));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {renderFormFields()}
                    <div className="flex items-center justify-between">
                        <Button type="submit" isLoading={loading} size="lg" variant="primary">Login</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
