import React, { useState } from 'react';
import { Button as RNButton, Text, View } from 'react-native';
import { ModalForm } from './index';

export default {
    title: 'Components/ModalForm',
    component: ModalForm,
};

const Template = (args) => {
    const [visible, setVisible] = useState(args.visible);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <RNButton title="Open Modal" onPress={() => setVisible(true)} />
            <ModalForm
                {...args}
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <Text>Form Content Goes Here</Text>
            </ModalForm>
        </View>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    title: 'Edit Item',
    submitLabel: 'Save Changes',
    loading: false,
};
