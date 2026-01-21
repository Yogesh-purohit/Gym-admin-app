import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, View } from 'react-native';
import { FormField } from './index';

export default {
    title: 'Components/FormField',
    component: FormField,
    decorators: [
        (Story) => (
            <View style={{ padding: 16 }}>
                <Story />
            </View>
        ),
    ],
};

const Template = (args) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <View>
            <FormField {...args} control={control} name="testField" />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    label: 'Test Field',
    placeholder: 'Type something...',
    rules: { required: 'This is required' },
};
