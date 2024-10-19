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

import {  useForm } from 'react-hook-form';
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

    // Render form fields
    const renderFormFields = () => {
        return REGISTER_FORM_FIELDS.map((field, idx) => (
            <div key={idx} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                    {field.label}
                </label>
                <Input id={field.name} type={field.type} placeholder={field.placeholder} {...register(field.name as keyof RegisterFormValues)} />
                {errors[field.name as keyof RegisterFormValues] && <InputErrorMessage message={errors[field.name as keyof RegisterFormValues]?.message} />}
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
                        <Button type="submit" isLoader={loading}>
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
