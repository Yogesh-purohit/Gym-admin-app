import React, { useState } from 'react';
import { View, Button as RNButton, Text } from 'react-native';
import { ActionMenu } from './index';

export default {
    title: 'Components/ActionMenu',
    component: ActionMenu,
    argTypes: {
        onClose: { action: 'closed' },
    },
};

const Template = (args) => {
    const [visible, setVisible] = useState(args.visible);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <RNButton title="Open Menu" onPress={() => setVisible(true)} />
            <ActionMenu
                {...args}
                visible={visible}
                onClose={() => {
                    setVisible(false);
                    args.onClose();
                }}
            />
        </View>
    );
};

export const Basic = Template.bind({});
Basic.args = {
    title: 'Options',
    options: [
        { label: 'Edit', icon: 'create-outline', onPress: () => console.log('Edit') },
        { label: 'Share', icon: 'share-outline', onPress: () => console.log('Share') },
        { label: 'Delete', icon: 'trash-outline', variant: 'destructive', onPress: () => console.log('Delete') },
    ],
    visible: false,
};
