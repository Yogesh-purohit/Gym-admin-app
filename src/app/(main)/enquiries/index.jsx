import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useAppData } from '../../../state/AppDataContext';
import { useTheme } from '../../../theme';
import { TableList, Card, StatusBadge, Button, ModalForm, FormField, ActionMenu } from '../../../components';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

export default function EnquiriesScreen() {
    const { state, actions } = useAppData();
    const { colors, spacing, typography } = useTheme();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        actions.fetchData('enquiries');
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        reset({});
        setModalVisible(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        reset(item);
        setModalVisible(true);
    };

    const onSubmit = async (data) => {
        try {
            if (editingId) {
                await actions.updateItem('enquiries', editingId, data);
            } else {
                const payload = {
                    ...data,
                    status: 'Pending',
                    nextFollowUpDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
                    createdAt: new Date().toISOString(),
                };
                await actions.createItem('enquiries', payload);
            }
            setModalVisible(false);
            reset();
        } catch (e) {
            console.error(e);
        }
    };

    const updateStatus = (item, newStatus) => {
        actions.updateItem('enquiries', item.id, { ...item, status: newStatus });
    };

    const convertToMember = (item) => {
        router.push({
            pathname: '/(main)/members',
            params: {
                convert: 'true',
                name: item.name,
                phone: item.phone,
                enquiryId: item.id
            }
        });
    };

    const onDelete = (id) => {
        Alert.alert("Delete Enquiry", "Confirm deletion?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => actions.deleteItem('enquiries', id) }
        ]);
    };

    const openMenu = (item) => {
        setActiveItem(item);
        setMenuVisible(true);
    };

    const enquiryActions = activeItem?.status === 'Converted' ? [
        { label: 'View Details', icon: 'information-circle-outline', onPress: () => router.push(`/(main)/enquiries/${activeItem?.id}`) },
        { label: 'Delete', icon: 'trash-outline', variant: 'destructive', onPress: () => onDelete(activeItem?.id) },
    ] : [
        { label: 'View Details', icon: 'information-circle-outline', onPress: () => router.push(`/(main)/enquiries/${activeItem?.id}`) },
        { label: 'Edit Enquiry', icon: 'create-outline', onPress: () => openEditModal(activeItem) },
        {
            label: 'Mark as Called',
            icon: 'call-outline',
            onPress: () => updateStatus(activeItem, 'Called'),
            hidden: activeItem?.status === 'Called'
        },
        {
            label: 'Convert to Member',
            icon: 'person-add-outline',
            onPress: () => convertToMember(activeItem),
            hidden: activeItem?.status === 'Converted'
        },
        {
            label: 'Mark as Lost',
            icon: 'close-circle-outline',
            onPress: () => updateStatus(activeItem, 'Lost'),
            hidden: activeItem?.status === 'Lost'
        },
        {
            label: 'Close Enquiry',
            icon: 'archive-outline',
            onPress: () => updateStatus(activeItem, 'Closed'),
            hidden: activeItem?.status === 'Closed'
        },
        { label: 'Delete', icon: 'trash-outline', variant: 'destructive', onPress: () => onDelete(activeItem?.id) },
    ].filter(a => !a.hidden);

    const renderItem = ({ item }) => (
        <Card style={{ padding: spacing.m, marginBottom: spacing.m }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ gap: 4, flex: 1 }}>
                    <Text style={{ color: colors.text.primary, fontWeight: 'bold', fontSize: typography.size.m }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: colors.text.secondary, fontSize: typography.size.s }}>
                        {item.phone} • {item.source}
                    </Text>
                    <Text style={{ color: colors.text.tertiary, fontSize: typography.size.xs }}>
                        Next Follow-up: {item.nextFollowUpDate}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: spacing.s }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.s }}>
                        <StatusBadge status={item.status} />
                        <TouchableOpacity onPress={() => openMenu(item)} style={{ padding: spacing.xs }}>
                            <Ionicons name="ellipsis-vertical" size={20} color={colors.text.secondary} />
                        </TouchableOpacity>
                    </View>
                    {item.status !== 'Converted' && (
                        <Button
                            title="Convert"
                            size="s"
                            variant="ghost"
                            onPress={() => convertToMember(item)}
                            textStyle={{ color: colors.action.primary, fontSize: 10 }}
                        />
                    )}
                </View>
            </View>
        </Card>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
            <View style={{ padding: spacing.m, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: colors.text.primary, fontSize: typography.size.xl, fontWeight: 'bold' }}>Enquiries ({state.enquiries.length})</Text>
                <Button title="Add New" size="s" onPress={openAddModal} />
            </View>

            <TableList
                data={state.enquiries}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onRefresh={() => actions.fetchData('enquiries')}
                refreshing={state.loading.enquiries}
                emptyMessage="No enquiries found. Better marketing ahead!"
            />

            <ModalForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={editingId ? "Edit Enquiry" : "New Enquiry"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <View style={{ gap: spacing.m }}>
                    <FormField control={control} name="name" placeholder="Full Name" rules={{ required: true }} />
                    <FormField control={control} name="phone" placeholder="Phone Number" rules={{ required: true }} keyboardType="phone-pad" />
                    <FormField control={control} name="source" placeholder="Source (e.g. Website, Walk-in)" rules={{ required: true }} />
                </View>
            </ModalForm>

            <ActionMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                options={enquiryActions}
                title={activeItem?.name}
            />
        </View>
    );
}
