import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { buildStyle } from '../../utils/styleProps';

export const Box = ({ children, style, ...props }) => {
    const { theme } = useTheme();
    const computedStyle = buildStyle(props, theme);

    return (
        <View style={[computedStyle, style]} {...props}>
            {children}
        </View>
    );
};
