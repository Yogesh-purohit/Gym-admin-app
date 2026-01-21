import React from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '../../primitives';
import { Button } from '../Button';
import { FormField } from './index';

export default {
    title: 'Design System/Components/FormField',
    component: FormField,
    decorators: [
        (Story) => (
            <Box padding="l">
                <Story />
            </Box>
        ),
    ],
};

const Template = (args) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
        },
    });

    const onSubmit = (data) => console.log(data);

    return (
        <Box gap="m">
            <FormField
                {...args}
                control={control}
                name="username"
                label="Username"
                placeholder="Enter username"
                rules={{ required: 'Username is required' }}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </Box>
    );
};

export const Basic = Template.bind({});
Basic.args = {};
