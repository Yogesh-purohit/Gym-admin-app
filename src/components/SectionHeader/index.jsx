import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';

export const SectionHeader = ({ title, action, onActionPress, style }) => {
    const { colors, spacing, typography } = useTheme();

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.m,
                },
                style,
            ]}
        >
            <Text
                style={{
                    fontSize: typography.size.l,
                    fontWeight: typography.weight.bold,
                    color: colors.text.primary,
                }}
            >
                {title}
            </Text>
            {action && (
                <TouchableOpacity onPress={onActionPress}>
                    <Text
                        style={{
                            fontSize: typography.size.s,
                            color: colors.text.link,
                            fontWeight: typography.weight.medium,
                        }}
                    >
                        {action}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
