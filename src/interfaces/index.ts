export interface IErrorResponse {
    error: {
      details?: {
        errors: {
          message: string;
        }[];
      };
      message?: string;
    };
}

export interface RegisterFormFields {
    name: 'email' | 'username' | 'password';
    label: string;
    type: 'email' | 'text' | 'password';
    placeholder: string;
}