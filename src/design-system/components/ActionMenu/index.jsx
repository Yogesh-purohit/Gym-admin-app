import React from 'react';
import { Modal } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Box, Text, Stack, Pressable } from '../../primitives';
import { Ionicons } from '@expo/vector-icons';

export const ActionMenu = ({ options, visible, onClose, title }) => {
    const { colors } = useTheme();

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable
                flex={1}
                bgColor="rgba(0,0,0,0.5)"
                justify="flex-end"
                onPress={onClose}
            >
                <Box
                    width="100%"
                    bgColor="background.secondary"
                    borderTopLeftRadius="xl"
                    borderTopRightRadius="xl"
                    paddingBottom="xxl"
                >
                    <Box
                        width={40}
                        height={5}
                        radius="xs"
                        bgColor="border.default"
                        alignSelf="center"
                        marginVertical="m"
                    />

                    {title && (
                        <Text
                            color="text.secondary"
                            paddingHorizontal="l"
                            paddingBottom="m"
                            fontSize="xs"
                            fontWeight="bold"
                            textAlign="center"
                            textTransform="uppercase"
                        >
                            {title}
                        </Text>
                    )}

                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            direction="row"
                            align="center"
                            paddingVertical="l"
                            paddingHorizontal="l"
                            borderBottomWidth={index === options.length - 1 ? 0 : 1}
                            borderBottomColor="border.subtle"
                            onPress={() => {
                                onClose();
                                option.onPress();
                            }}
                        >
                            <Stack direction="row" align="center" gap="m">
                                {option.icon && (
                                    <Ionicons
                                        name={option.icon}
                                        size={24}
                                        color={option.variant === 'destructive' ? colors.status.error : colors.text.primary}
                                    />
                                )}
                                <Text
                                    color={option.variant === 'destructive' ? 'status.error' : 'text.primary'}
                                    fontSize="m"
                                    fontWeight="medium"
                                >
                                    {option.label}
                                </Text>
                            </Stack>
                        </Pressable>
                    ))}

                    <Pressable
                        marginTop="s"
                        paddingVertical="l"
                        bgColor="background.tertiary"
                        onPress={onClose}
                    >
                        <Text color="text.primary" fontWeight="bold" textAlign="center">
                            Cancel
                        </Text>
                    </Pressable>
                </Box>
            </Pressable>
        </Modal>
    );
};
