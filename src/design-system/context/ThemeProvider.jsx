import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
// Assuming storage utility is still available there, we might need to adjust import path later if we move it
import { storage } from '../../utils/storage';
import { lightTheme } from '../theme/light';
import { darkTheme } from '../theme/dark';

const ThemeContext = createContext({
    theme: lightTheme,
    isDark: false,
    manualTheme: null,
    setTheme: () => { },
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

    const currentTheme = isDark ? darkTheme : lightTheme;

    const contextValue = useMemo(() => ({
        theme: currentTheme,
        // Spread theme constants for easier access
        colors: currentTheme.colors,
        spacing: currentTheme.spacing,
        radii: currentTheme.radii,
        shadows: currentTheme.shadows,
        layout: currentTheme.layout,
        typography: currentTheme.typography,

        isDark,
        manualTheme,
        setTheme: updateTheme,
        toggleTheme: () => updateTheme(isDark ? 'light' : 'dark'),
    }), [isDark, manualTheme, currentTheme]);

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
