import { Stack } from 'expo-router';
import { useTheme } from '../../../theme';

export default function MembersLayout() {
    const { colors } = useTheme();

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: colors.background.secondary },
            headerTintColor: colors.text.primary,
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitleVisible: false,
        }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'Member Details' }} />
        </Stack>
    );
}
