import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Pressable, Text, Box } from '../../primitives';

export const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'm',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon,
    ...props
}) => {
    const { colors } = useTheme();

    const getBgColor = () => {
        if (disabled) return 'action.disabled';
        if (variant === 'primary') return 'action.primary';
        if (variant === 'secondary') return 'action.secondary';
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return 'text.tertiary';
        if (variant === 'primary') return 'text.inverse';
        if (variant === 'secondary') return 'text.primary';
        return 'action.primary';
    };

    const getBorderColor = () => {
        if (variant === 'outline') return 'action.primary';
        if (variant === 'secondary') return 'border.default';
        return 'transparent';
    };

    const getPressedStyle = () => {
        if (disabled || loading) return null;
        switch (variant) {
            case 'primary':
                return { backgroundColor: colors.action.primaryPressed };
            case 'secondary':
                return { backgroundColor: colors.action.secondaryPressed };
            case 'outline':
                return { backgroundColor: colors.background.tertiary };
            case 'ghost':
                return { backgroundColor: colors.background.tertiary };
            default:
                return null;
        }
    };

    const paddingY = size === 's' ? 'xs' : size === 'l' ? 'm' : 's';
    const paddingX = size === 's' ? 'm' : size === 'l' ? 'xl' : 'l';

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            direction="row"
            align="center"
            justify="center"
            paddingVertical={paddingY}
            paddingHorizontal={paddingX}
            bgColor={getBgColor()}
            borderColor={getBorderColor()}
            borderWidth={variant === 'outline' || variant === 'secondary' ? 1 : 0}
            radius="m"
            opacity={disabled ? 0.6 : 1}
            pressedStyle={getPressedStyle()}
            style={style}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    color={disabled ? colors.text.tertiary : (variant === 'primary' ? colors.text.inverse : colors.action.primary)}
                    size="small"
                />
            ) : (
                <>
                    {icon && <Box marginRight="xs">{icon}</Box>}
                    <Text
                        variant="body"
                        color={getTextColor()}
                        fontSize={size}
                        fontWeight="medium"
                        textAlign="center"
                        style={textStyle}
                    >
                        {title}
                    </Text>
                </>
            )}
        </Pressable>
    );
};
