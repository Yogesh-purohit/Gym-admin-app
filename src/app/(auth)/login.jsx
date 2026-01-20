import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { Link } from 'expo-router';
import { useTheme } from '../../theme';
import { useAuth } from '../../state/AuthContext';
import { Button, FormField, Card } from '../../components';

export default function LoginScreen() {
    const { colors, spacing, typography } = useTheme();
    const { login, isLoading, error } = useAuth();
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
        } catch (e) {
            // Error handled in context
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
            <Card
                style={{ width: '90%', padding: spacing.xl }}
                variant="elevated"
            >
                <Text
                    style={{
                        fontSize: typography.size.xxl,
                        fontWeight: typography.weight.bold,
                        color: colors.text.primary,
                        marginBottom: spacing.l,
                        textAlign: 'center',
                    }}
                >
                    Gym Manager
                </Text>

                {error && (
                    <Text style={{ color: colors.status.error, marginBottom: spacing.m, textAlign: 'center' }}>
                        {error}
                    </Text>
                )}

                <View style={{ gap: spacing.m }}>
                    <FormField
                        control={control}
                        name="email"
                        placeholder="Email"
                        rules={{ required: 'Email is required' }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <FormField
                        control={control}
                        name="password"
                        placeholder="Password"
                        rules={{ required: 'Password is required' }}
                        secureTextEntry
                    />

                    <Button
                        title="Sign In"
                        onPress={handleSubmit(onSubmit)}
                        loading={isLoading}
                        variant="primary"
                        size="l"
                        style={{ marginTop: spacing.s }}
                    />

                    <Text style={{ textAlign: 'center', color: colors.text.secondary, fontSize: typography.size.s }}>
                        Use admin@gym.com / password
                    </Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
