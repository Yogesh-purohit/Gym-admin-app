import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { useAppData } from '../../../state/AppDataContext';
import { useTheme } from '../../../theme';
import { TableList, Card, StatusBadge, Button, ModalForm, FormField, ActionMenu } from '../../../components';
import { useForm } from 'react-hook-form';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function MembersScreen() {
    const { state, actions } = useAppData();
    const { colors, spacing, typography, radii } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const { control, handleSubmit, reset, setValue } = useForm();
    const params = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        actions.fetchData('members');
        actions.fetchData('enquiries');
    }, []);

    useEffect(() => {
        if (params.convert === 'true') {
            setEditingId(null);
            reset({
                name: params.name,
                phone: params.phone
            });
            setSelectedImage(null);
            setModalVisible(true);
        }
    }, [params.convert]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Camera access is required to take photos.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            console.warn("Camera Error:", error);
            Alert.alert("Camera Error", "Camera is not available on this device.");
        }
    };

    const openAddModal = () => {
        setEditingId(null);
        reset({});
        setSelectedImage(null);
        setModalVisible(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        reset(item);
        setSelectedImage(item.image || null);
        setModalVisible(true);
    };

    const onSubmit = async (data) => {
        try {
            const finalData = { ...data, image: selectedImage };
            if (editingId) {
                await actions.updateItem('members', editingId, finalData);
            } else {
                const payload = {
                    ...finalData,
                    admissionDate: new Date().toISOString().split('T')[0],
                    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                };
                await actions.createItem('members', payload);

                if (params.enquiryId) {
                    const enquiry = state.enquiries.find(e => e.id === params.enquiryId);
                    if (enquiry) {
                        await actions.updateItem('enquiries', params.enquiryId, { ...enquiry, status: 'Converted' });
                    }
                }
            }
            setModalVisible(false);
            reset();
            setSelectedImage(null);
        } catch (e) {
            console.error(e);
        }
    };

    const onDelete = (id) => {
        Alert.alert("Delete Member", "Are you sure? This action is permanent.", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => actions.deleteItem('members', id) }
        ]);
    };

    const openMenu = (item) => {
        setActiveItem(item);
        setMenuVisible(true);
    };

    const renewMember = async (months) => {
        const currentDate = new Date(activeItem.expiryDate);
        const today = new Date();
        // If expired, start from today, else extend current
        const baseDate = currentDate > today ? currentDate : today;
        const newExpiry = new Date(baseDate.setMonth(baseDate.getMonth() + months));

        await actions.updateItem('members', activeItem.id, {
            ...activeItem,
            expiryDate: newExpiry.toISOString().split('T')[0]
        });
        setMenuVisible(false);
    };

    const memberActions = [
        { label: 'View Profile', icon: 'person-outline', onPress: () => router.push(`/(main)/members/${activeItem?.id}`) },
        { label: 'Edit Details', icon: 'create-outline', onPress: () => openEditModal(activeItem) },
        { label: 'Renew (1 Month)', icon: 'calendar-outline', onPress: () => renewMember(1) },
        { label: 'Renew (1 Year)', icon: 'calendar-number-outline', onPress: () => renewMember(12) },
        { label: 'Delete Member', icon: 'trash-outline', variant: 'destructive', onPress: () => onDelete(activeItem?.id) },
    ];

    const renderItem = ({ item }) => (
        <Card style={{ padding: spacing.m, marginBottom: spacing.m }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.m, flex: 1 }}>
                    {item.image ? (
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    ) : (
                        <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: colors.background.tertiary, justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="person" size={24} color={colors.text.tertiary} />
                        </View>
                    )}
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.text.primary, fontWeight: 'bold', fontSize: typography.size.m }}>
                            {item.name}
                        </Text>
                        <Text style={{ color: colors.text.secondary, fontSize: typography.size.s }}>
                            {item.phone} • {item.plan}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}>
                    <StatusBadge status={new Date(item.expiryDate) > new Date() ? 'Active' : 'Expired'} />
                    <TouchableOpacity onPress={() => openMenu(item)} style={{ padding: spacing.s }}>
                        <Ionicons name="ellipsis-vertical" size={20} color={colors.text.secondary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
            <View style={{ padding: spacing.m, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: colors.text.primary, fontSize: typography.size.xl, fontWeight: 'bold' }}>Members ({state.members.length})</Text>
                <Button title="Add New" size="s" onPress={openAddModal} />
            </View>

            <TableList
                data={state.members || []}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onRefresh={() => actions.fetchData('members')}
                refreshing={state.loading.members}
                emptyMessage="No members found. Add your first member!"
            />

            <ModalForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={editingId ? "Edit Member" : "New Member"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <View style={{ gap: spacing.m }}>
                    <View style={{ alignItems: 'center', marginBottom: spacing.m }}>
                        <TouchableOpacity onPress={pickImage} style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: colors.background.secondary, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: colors.border.default }}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
                            ) : (
                                <Ionicons name="camera" size={32} color={colors.text.tertiary} />
                            )}
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', gap: spacing.m, marginTop: spacing.s }}>
                            <TouchableOpacity onPress={pickImage}><Text style={{ color: colors.action.primary }}>Gallery</Text></TouchableOpacity>
                            <TouchableOpacity onPress={takePhoto}><Text style={{ color: colors.action.primary }}>Camera</Text></TouchableOpacity>
                        </View>
                    </View>
                    <FormField control={control} name="name" placeholder="Full Name" rules={{ required: true }} />
                    <FormField control={control} name="phone" placeholder="Phone Number" rules={{ required: true }} keyboardType="phone-pad" />
                    <FormField control={control} name="age" placeholder="Age" rules={{ required: true }} keyboardType="numeric" />
                    <FormField control={control} name="plan" placeholder="Plan (e.g. Gold, Silver)" rules={{ required: true }} />
                </View>
            </ModalForm>

            <ActionMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                options={memberActions}
                title={activeItem?.name}
            />
        </View>
    );
}
