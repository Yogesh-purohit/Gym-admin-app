import React from 'react';
import { Pressable, Text, Stack } from '../../primitives';

export const SectionHeader = ({ title, action, onActionPress, style, ...props }) => {
    return (
        <Stack
            direction="row"
            justify="space-between"
            align="center"
            marginBottom="m"
            style={style}
            {...props}
        >
            <Text
                fontSize="l"
                fontWeight="bold"
                color="text.primary"
            >
                {title}
            </Text>
            {action && (
                <Pressable onPress={onActionPress}>
                    <Text
                        fontSize="s"
                        color="text.link"
                        fontWeight="medium"
                    >
                        {action}
                    </Text>
                </Pressable>
            )}
        </Stack>
    );
};
