import { Slot } from 'expo-router';
import { ThemeProvider } from '../theme';
import { AuthProvider } from '../state/AuthContext';
import { AppDataProvider } from '../state/AppDataContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <AuthProvider>
                    <AppDataProvider>
                        <Slot />
                    </AppDataProvider>
                </AuthProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
