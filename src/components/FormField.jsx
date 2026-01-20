import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from './Input';

export const FormField = ({ control, name, rules, ...props }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Input
                    {...props}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={error}
                />
            )}
        />
    );
};
