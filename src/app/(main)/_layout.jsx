import { Tabs, useRouter } from 'expo-router';
import { useTheme } from '../../theme';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MainLayout() {
    const { colors } = useTheme();
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: colors.background.secondary,
                    height: 100,
                },
                headerTitleStyle: {
                    color: colors.text.primary,
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                        <TouchableOpacity onPress={() => router.push('/(main)/settings')}>
                            <Ionicons name="settings-outline" size={24} color={colors.text.primary} />
                        </TouchableOpacity>
                    </View>
                ),
                tabBarActiveTintColor: colors.action.primary,
                tabBarInactiveTintColor: colors.text.tertiary,
                tabBarStyle: {
                    backgroundColor: colors.background.secondary,
                    borderTopColor: colors.border.subtle,
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="members"
                options={{
                    title: 'Members',
                    tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="attendance"
                options={{
                    title: 'Attendance',
                    tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="enquiries"
                options={{
                    title: 'Enquiries',
                    tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    href: null,
                    title: 'Settings'
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    href: null,
                    headerShown: false,
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tabs>
    );
}
