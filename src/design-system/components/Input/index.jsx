import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Box, Text } from '../../primitives';

export const Input = ({
    label,
    error,
    leftIcon,
    rightIcon,
    style,
    containerStyle,
    ...props
}) => {
    const { colors, spacing, radii, typography } = useTheme();

    return (
        <Box width="100%" style={containerStyle}>
            {label && (
                <Text
                    color="text.secondary"
                    marginBottom="xs"
                    fontSize="s"
                    fontWeight="medium"
                >
                    {label}
                </Text>
            )}
            <Box
                direction="row"
                align="center"
                bgColor="background.secondary"
                borderColor={error ? 'status.error' : 'border.default'}
                borderWidth={1}
                radius="m"
                paddingHorizontal="m"
                height={48}
            >
                {leftIcon && <Box marginRight="s">{leftIcon}</Box>}
                <TextInput
                    style={[
                        {
                            flex: 1,
                            height: '100%',
                            color: colors.text.primary,
                            fontSize: typography.size.m,
                            fontFamily: typography.fontFamily.regular,
                        },
                        style,
                    ]}
                    placeholderTextColor={colors.text.tertiary}
                    {...props}
                />
                {rightIcon && <Box marginLeft="s">{rightIcon}</Box>}
            </Box>
            {error && (
                <Text
                    color="status.error"
                    marginTop="xs"
                    fontSize="xs"
                >
                    {typeof error === 'string' ? error : error.message}
                </Text>
            )}
        </Box>
    );
};
