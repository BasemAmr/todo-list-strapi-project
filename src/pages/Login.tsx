import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import InputErrorMessage from '../components/ui/InputErrorMessage';
import { toast } from 'react-hot-toast';

import { LOGIN_FORM_FIELDS } from '../data';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation';

import { instance } from '../config/axios.config';
import { IErrorResponse } from '../interfaces';

import { useForm, useWatch } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginFormValues {
    identifier: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    // Form state management
    const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormValues>({
        resolver: yupResolver(loginSchema)
    });

    const [loading, setLoading] = useState(false);

    // Watch form values for real-time validation feedback
    const formValues = useWatch({ control });

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
        return LOGIN_FORM_FIELDS.map((field, idx) => {
            const isError = !!errors[field.name as keyof LoginFormValues];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const isValid = !!formValues[field.name as keyof LoginFormValues] && !isError;

            return (
                <div key={idx} className="mb-6">
                    <label 
                        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" 
                        htmlFor={field.name}
                    >
                        {field.label}
                    </label>
                    <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        error={isError}
                        aria-invalid={isError}
                        aria-describedby={`${field.name}-error`}
                        {...register(field.name as keyof LoginFormValues)}
                    />
                    {isError && (
                        <InputErrorMessage id={`${field.name}-error`} message={errors[field.name as keyof LoginFormValues]?.message} />
                    )}
                </div>
            );
        });
    };
    
    return (
        <motion.div 
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.3 }}
        >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} aria-label="Login Form">
                    {renderFormFields()}
                    <div className="flex items-center justify-between mt-4">
                        <Button 
                            type="submit" 
                            isLoading={loading} 
                            className="w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-2 rounded-md transition-all duration-300"
                        >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default LoginPage;
