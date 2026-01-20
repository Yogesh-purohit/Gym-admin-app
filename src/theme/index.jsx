import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '../utils/storage';
import { lightTheme, darkTheme } from './colors';
import { spacing, radii, shadows, layout } from './spacing';
import { typography } from './typography';

const ThemeContext = createContext({
    colors: lightTheme,
    spacing,
    radii,
    shadows,
    layout,
    typography,
    isDark: false,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
    const colorScheme = useColorScheme();
    const [manualTheme, setManualTheme] = useState(null); // 'light', 'dark', or null (system)

    useEffect(() => {
        // Load saved theme preference
        const savedTheme = storage.get('theme_preference');
        if (savedTheme) {
            setManualTheme(savedTheme);
        }
    }, []);

    const isDark = manualTheme ? manualTheme === 'dark' : colorScheme === 'dark';

    const updateTheme = (newTheme) => {
        setManualTheme(newTheme);
        if (newTheme) {
            storage.save('theme_preference', newTheme);
        } else {
            storage.remove('theme_preference');
        }
    };

    const theme = useMemo(() => ({
        colors: isDark ? darkTheme : lightTheme,
        spacing,
        radii,
        shadows,
        layout,
        typography,
        isDark,
        manualTheme,
        setTheme: updateTheme,
        toggleTheme: () => updateTheme(isDark ? 'light' : 'dark'), // Keep for backward compatibility if needed
    }), [isDark, manualTheme]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
