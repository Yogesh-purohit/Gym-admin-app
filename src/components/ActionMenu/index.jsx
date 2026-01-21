import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

/**
 * ActionMenu Component
 * 
 * @param {Array} options - List of objects: { label, onPress, icon, variant }
 * @param {Boolean} visible - Control visibility
 * @param {Function} onClose - Close callback
 * @param {String} title - Optional title
 */
export const ActionMenu = ({ options, visible, onClose, title }) => {
    const { colors, spacing, radii, typography } = useTheme();

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <View style={[styles.menuContainer, {
                    backgroundColor: colors.background.secondary,
                    borderTopLeftRadius: radii.xl,
                    borderTopRightRadius: radii.xl,
                    paddingBottom: spacing.xxl,
                }]}>
                    <View style={[styles.handle, { backgroundColor: colors.border.default }]} />

                    {title && (
                        <Text style={[styles.title, {
                            color: colors.text.secondary,
                            paddingHorizontal: spacing.l,
                            paddingBottom: spacing.m,
                            fontSize: typography.size.s,
                            fontWeight: 'bold',
                        }]}>
                            {title.toUpperCase()}
                        </Text>
                    )}

                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.option, {
                                borderBottomWidth: index === options.length - 1 ? 0 : 1,
                                borderBottomColor: colors.border.subtle,
                                paddingVertical: spacing.l,
                                paddingHorizontal: spacing.l,
                            }]}
                            onPress={() => {
                                onClose();
                                option.onPress();
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.m }}>
                                {option.icon && (
                                    <Ionicons
                                        name={option.icon}
                                        size={24}
                                        color={option.variant === 'destructive' ? colors.status.error : colors.text.primary}
                                    />
                                )}
                                <Text style={{
                                    color: option.variant === 'destructive' ? colors.status.error : colors.text.primary,
                                    fontSize: typography.size.m,
                                    fontWeight: '500'
                                }}>
                                    {option.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.cancelButton, {
                            marginTop: spacing.s,
                            paddingVertical: spacing.l,
                            backgroundColor: colors.background.tertiary,
                        }]}
                        onPress={onClose}
                    >
                        <Text style={{ color: colors.text.primary, fontWeight: '600', textAlign: 'center' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    menuContainer: {
        width: '100%',
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 3,
        alignSelf: 'center',
        marginVertical: 12,
    },
    title: {
        textAlign: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cancelButton: {
        width: '100%',
    }
});
