import React, { useState } from 'react';
import { Box } from '../../primitives';
import { Button } from '../Button';
import { ActionMenu } from './index';

export default {
    title: 'Design System/Components/ActionMenu',
    component: ActionMenu,
    argTypes: {
        onClose: { action: 'closed' },
    },
};

const Template = (args) => {
    const [visible, setVisible] = useState(false);

    return (
        <Box flex={1} justify="center" align="center" padding="xl">
            {/* Using the new Button component from design system */}
            <Button title="Open Action Menu" onPress={() => setVisible(true)} />
            <ActionMenu
                {...args}
                visible={visible}
                onClose={() => {
                    setVisible(false);
                    args.onClose();
                }}
            />
        </Box>
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
};
