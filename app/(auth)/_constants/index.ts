const SCHEMA_NAMES = ['sign-up', 'sign-in'] as const;

// Step 2: Create a type from the array
export type TSchema = typeof SCHEMA_NAMES[number];

export const SIGN_UP_FIELDS = [{
    type: 'text',
    name: 'name',
},
{
    type: 'email',
    name: 'email',
},
{
    type: 'password',
    name: 'password',
},
{
    type: 'password',
    name: 'confirmPassword',
},
{
    type: 'select',
    name: 'role',
}
];

export const SIGN_UP_INITIAL_VALUES = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
} as Record<typeof SIGN_UP_FIELDS[number]['name'], any>;

export const SIGN_IN_FIELDS = [{
    type: 'email',
    name: 'email',
},
{
    type: 'password',
    name: 'password',

}];

export const SIGN_IN_INITIAL_VALUES = {
    email: '',
    password: '',
} as Record<typeof SIGN_IN_FIELDS[number]['name'], any>;