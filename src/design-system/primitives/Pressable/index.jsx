import React from 'react';
import { Pressable as RNPressable } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { buildStyle } from '../../utils/styleProps';

export const Pressable = ({
    children,
    style,
    pressedStyle,
    hoverStyle,
    disabled,
    ...props
}) => {
    const { theme } = useTheme();

    const computedStyle = buildStyle(props, theme);

    return (
        <RNPressable
            disabled={disabled}
            style={({ pressed, hovered }) => [
                computedStyle,
                style,
                hovered && hoverStyle,
                pressed && (pressedStyle || { opacity: 0.8 }),
            ]}
            {...props}
        >
            {children}
        </RNPressable>
    );
};
