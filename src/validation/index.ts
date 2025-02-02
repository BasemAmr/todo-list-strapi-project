import * as yup from 'yup';

// Register schema
export const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// Login schema
export const loginSchema = yup.object().shape({
    identifier: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});


// Save todo schema
export const TodoSchema = yup.object().shape({

    title: yup.string().required('Title is required'),

    description: yup.string().required('Description is required'),

    completed: yup.boolean().required('Completed is required'),

});