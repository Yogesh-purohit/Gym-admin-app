import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../state/AuthContext';
import { useTheme } from '../theme';

export default function Index() {
    const { colors } = useTheme();
    // The AuthContext handles the redirect logic in its useEffect.
    // This component just needs to exist to match the "/" route.

    return (
        <View style={{ flex: 1, backgroundColor: colors.background.primary, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.action.primary} />
        </View>
    );
}
