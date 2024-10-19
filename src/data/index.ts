import { RegisterFormFields } from "../interfaces";

export const REGISTER_FORM_FIELDS: RegisterFormFields[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
    },
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
    },
];