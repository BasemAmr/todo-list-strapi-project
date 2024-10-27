import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import InputErrorMessage from '../components/ui/InputErrorMessage';
import { toast } from 'react-hot-toast';

import { REGISTER_FORM_FIELDS } from '../data';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validation';

import { useNavigate } from 'react-router-dom';
import { instance } from '../config/axios.config';
import { IErrorResponse } from '../interfaces';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useState } from 'react';

interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
}

export const RegisterPage: React.FC = () => {
    // Form state management
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = useState(false);

    // Navigation
    const navigate = useNavigate();

    // Form submission handler
    const onSubmit = async (data: RegisterFormValues) => {
        setLoading(true);
        try {
            const { status } = await instance.post('/auth/local/register', data);

            if (status === 200) {
                toast.success('Account created successfully, you will be redirected to login page after 2 seconds');
                
                // Redirect to login page
                setTimeout(() => {
                    navigate('/login');
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

    const renderFormFields = () => {
        return REGISTER_FORM_FIELDS.map((field, idx) => (
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
                    aria-invalid={errors[field.name as keyof RegisterFormValues] ? "true" : "false"}
                    aria-describedby={`${field.name}-error`}
                    error={!!errors[field.name as keyof RegisterFormValues]}
                    {...register(field.name as keyof RegisterFormValues)}
                />
                {errors[field.name as keyof RegisterFormValues] && (
                    <InputErrorMessage id={`${field.name}-error`} message={errors[field.name as keyof RegisterFormValues]?.message} />
                )}
            </div>
        ));
    };
    
    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-all duration-300"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} aria-label="Register Form">
                    {renderFormFields()}
                    <div className="flex items-center justify-between mt-4">
                        <Button type="submit" isLoading={loading} className="w-full bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-2 rounded-md transition-all duration-300">
                            Register
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default RegisterPage;
