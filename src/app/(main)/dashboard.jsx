import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useAuth } from '../../state/AuthContext';
import { useAppData } from '../../state/AppDataContext';
import { useTheme } from '../../theme';
import { Card, SectionHeader, Button } from '../../components';
import { useRouter } from 'expo-router';

const StatCard = ({ title, value, subtext, color }) => {
    const { colors, spacing, typography } = useTheme();
    return (
        <Card style={{ flex: 1, padding: spacing.m }}>
            <Text style={{ color: colors.text.secondary, fontSize: typography.size.s }}>{title}</Text>
            <Text style={{ color: color || colors.text.primary, fontSize: typography.size.xxl, fontWeight: 'bold' }}>
                {value}
            </Text>
            {subtext && <Text style={{ color: colors.text.tertiary, fontSize: typography.size.xs }}>{subtext}</Text>}
        </Card>
    );
};

export default function DashboardScreen() {
    const { user, logout } = useAuth();
    const { state, actions } = useAppData();
    const { colors, spacing } = useTheme();
    const router = useRouter();

    useEffect(() => {
        actions.fetchData('members');
        actions.fetchData('attendance');
        actions.fetchData('enquiries');
    }, []);

    const pendingEnquiries = state.enquiries.filter(e => e.status === 'Pending').length;
    const newMembers = state.members.filter(m => {
        const admission = new Date(m.admissionDate);
        const today = new Date();
        const diff = today - admission;
        return diff < 30 * 24 * 60 * 60 * 1000;
    }).length;

    const presentCount = state.attendance.filter(a => a.status === 'Present').length;
    const absentCount = state.attendance.filter(a => a.status === 'Absent').length;

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background.primary }}
            contentContainerStyle={{ padding: spacing.l, gap: spacing.l }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={{ color: colors.text.primary, fontSize: 24, fontWeight: 'bold' }}>
                        Hello, {user?.name}
                    </Text>
                    <Text style={{ color: colors.text.secondary }}>Welcome back</Text>
                </View>
            </View>

            <SectionHeader title="Overview" />

            <View style={{ flexDirection: 'row', gap: spacing.m }}>
                <StatCard title="New Members" value={newMembers} subtext="this month" color={colors.status.info} />
                <StatCard title="Pending Enquiries" value={pendingEnquiries} subtext="action needed" color={colors.status.warning} />
            </View>

            <View style={{ flexDirection: 'row', gap: spacing.m }}>
                <StatCard title="Present" value={presentCount} subtext="checked in today" color={colors.status.success} />
                <StatCard title="Absent" value={absentCount} subtext="not seen today" color={colors.status.error} />
            </View>

            <SectionHeader title="Quick Actions" />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.m }}>
                <Button
                    title="Add Member"
                    variant="secondary"
                    style={{ flex: 1 }}
                    onPress={() => router.push('/(main)/members')}
                    icon={<Text>➕</Text>}
                />
                <Button
                    title="Attendance"
                    variant="secondary"
                    style={{ flex: 1 }}
                    onPress={() => router.push('/(main)/attendance')}
                    icon={<Text>📅</Text>}
                />
            </View>

        </ScrollView>
    );
}
