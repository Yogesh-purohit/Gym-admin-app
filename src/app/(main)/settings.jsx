import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { useTheme } from '../../theme';
import { SectionHeader, Card, Button } from '../../components';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../state/AuthContext';

const RadioOption = ({ label, selected, onSelect, color, textColor }) => (
    <Pressable onPress={onSelect} style={styles.radioRow}>
        <View style={[styles.radioOuter, { borderColor: selected ? color : '#ccc' }]}>
            {selected && <View style={[styles.radioInner, { backgroundColor: color }]} />}
        </View>
        <Text style={[styles.radioLabel, { color: textColor }]}>{label}</Text>
    </Pressable>
);

export default function SettingsScreen() {
    const { colors, spacing, typography, manualTheme, setTheme, isDark } = useTheme();
    const { logout } = useAuth();
    const router = useRouter();

    const isSystem = manualTheme === null;

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary, padding: spacing.m }]}>
            <SectionHeader title="Settings" />

            <View style={{ gap: spacing.m, marginTop: spacing.m }}>

                {/* Theme Settings */}
                <Card style={{ padding: spacing.m, gap: spacing.m }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}>
                            <Ionicons name="contrast-outline" size={24} color={colors.text.primary} />
                            <Text style={{ color: colors.text.primary, fontSize: typography.size.m, fontWeight: '600' }}>Appearance</Text>
                        </View>
                    </View>

                    <View style={{ height: 1, backgroundColor: colors.border.subtle }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: colors.text.primary, fontSize: typography.size.m }}>Use System Theme</Text>
                        <Switch
                            value={isSystem}
                            onValueChange={(val) => setTheme(val ? null : (isDark ? 'dark' : 'light'))}
                            trackColor={{ false: '#767577', true: colors.action.primary }}
                        />
                    </View>

                    {!isSystem && (
                        <View style={{ gap: spacing.s, marginLeft: spacing.s }}>
                            <RadioOption
                                label="Light Mode"
                                selected={manualTheme === 'light'}
                                onSelect={() => setTheme('light')}
                                color={colors.action.primary}
                                textColor={colors.text.primary}
                            />
                            <RadioOption
                                label="Dark Mode"
                                selected={manualTheme === 'dark'}
                                onSelect={() => setTheme('dark')}
                                color={colors.action.primary}
                                textColor={colors.text.primary}
                            />
                        </View>
                    )}
                </Card>

                {/* About App */}
                <Card style={{ padding: spacing.m }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}
                        onPress={() => Alert.alert("App Version", "Gymie v1.1.0")}
                    >
                        <Ionicons name="information-circle-outline" size={24} color={colors.text.primary} />
                        <Text style={{ color: colors.text.primary, fontSize: typography.size.m }}>About App</Text>
                    </TouchableOpacity>
                </Card>

                <Button
                    title="Logout"
                    variant="ghost"
                    onPress={logout}
                    style={{ marginTop: spacing.xl, borderColor: colors.status.error, borderWidth: 1 }}
                    textStyle={{ color: colors.status.error }}
                    icon={<Ionicons name="log-out-outline" size={20} color={colors.status.error} />}
                />
            </View>

            <View style={{ flex: 1 }} />
            <Button title="Back to Dashboard" variant="secondary" onPress={() => router.back()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    radioLabel: {
        fontSize: 16,
    }
});
