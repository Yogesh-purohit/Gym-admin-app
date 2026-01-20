import React from 'react';
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { Button } from './Button';
import { Card } from './Card';

export const ModalForm = ({
    visible,
    onClose,
    title,
    children,
    onSubmit,
    loading,
    submitLabel = 'Save',
}) => {
    const { colors, spacing, radii, typography } = useTheme();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                    <View
                        style={[
                            styles.container,
                            {
                                backgroundColor: colors.background.modal,
                                borderTopLeftRadius: radii.xl,
                                borderTopRightRadius: radii.xl,
                            },
                        ]}
                    >
                        <View style={[styles.header, { borderBottomColor: colors.border.subtle }]}>
                            <Text style={[styles.title, { color: colors.text.primary, fontSize: typography.size.l }]}>
                                {title}
                            </Text>
                            <Button
                                title="Cancel"
                                variant="ghost"
                                onPress={onClose}
                                size="s"
                                textStyle={{ color: colors.text.secondary }}
                            />
                        </View>

                        <ScrollView contentContainerStyle={{ padding: spacing.l }}>
                            {children}

                            <View style={{ marginTop: spacing.xl }}>
                                <Button
                                    title={submitLabel}
                                    onPress={onSubmit}
                                    loading={loading}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        maxHeight: '90%',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
    },
    title: {
        fontWeight: 'bold',
    },
});
