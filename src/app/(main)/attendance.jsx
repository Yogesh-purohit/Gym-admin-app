import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppData } from '../../state/AppDataContext';
import { useTheme } from '../../theme';
import { TableList, Card, StatusBadge } from '../../components';

export default function AttendanceScreen() {
    const { state, actions } = useAppData();
    const { colors, spacing, typography } = useTheme();

    useEffect(() => {
        actions.fetchData('attendance');
        actions.fetchData('members');
    }, []);

    const toggleStatus = (member) => {
        const today = new Date().toISOString().split('T')[0];
        const record = state.attendance.find(a => a.memberId === member.id && a.date === today);

        if (record) {
            const newStatus = record.status === 'Present' ? 'Absent' : 'Present';
            actions.updateItem('attendance', record.id, { ...record, status: newStatus });
        } else {
            actions.createItem('attendance', {
                memberId: member.id,
                memberName: member.name,
                status: 'Present',
                date: today,
                time: new Date().toISOString()
            });
        }
    };

    const renderItem = ({ item: member }) => {
        const today = new Date().toISOString().split('T')[0];
        const record = state.attendance.find(a => a.memberId === member.id && a.date === today);
        const status = record ? record.status : 'N/A';

        return (
            <Card style={{ padding: spacing.m }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: colors.text.primary, fontWeight: 'bold', fontSize: typography.size.m }}>
                            {member.name}
                        </Text>
                        <Text style={{ color: colors.text.secondary, fontSize: typography.size.s }}>
                            {record ? `Marked at: ${new Date(record.time || record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Not marked today'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => toggleStatus(member)}>
                        <StatusBadge status={status} />
                    </TouchableOpacity>
                </View>
            </Card>
        );
    };

    const today = new Date().toISOString().split('T')[0];
    const present = state.attendance.filter(a => a.date === today && a.status === 'Present').length;
    const total = state.members.length;

    return (
        <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
            <View style={{ padding: spacing.m }}>
                <Text style={{ color: colors.text.primary, fontSize: typography.size.xl, fontWeight: 'bold' }}>Attendance Today</Text>
                <View style={{ flexDirection: 'row', gap: spacing.m, marginTop: spacing.s }}>
                    <Text style={{ color: colors.status.success }}>Present: {present}</Text>
                    <Text style={{ color: colors.text.secondary }}>Total Members: {total}</Text>
                </View>
            </View>

            <TableList
                data={state.members}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onRefresh={() => {
                    actions.fetchData('attendance');
                    actions.fetchData('members');
                }}
                refreshing={state.loading.attendance || state.loading.members}
                emptyMessage="No members found to mark attendance"
            />
        </View>
    );
}
