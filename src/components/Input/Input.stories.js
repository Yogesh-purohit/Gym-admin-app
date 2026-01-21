import React from 'react';
import { Input } from './index';

export default {
    title: 'Components/Input',
    component: Input,
    argTypes: {
        label: { control: 'text' },
        error: { control: 'text' },
        placeholder: { control: 'text' },
    },
};

export const Basic = {
    args: {
        label: 'Username',
        placeholder: 'Enter username',
    },
};

export const WithError = {
    args: {
        label: 'Email',
        value: 'invalid-email',
        error: 'Please enter a valid email',
    },
};
