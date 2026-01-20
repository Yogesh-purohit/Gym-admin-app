import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppData } from '../../../state/AppDataContext';
import { useTheme } from '../../../theme';
import { Card, SectionHeader, StatusBadge, Button } from '../../../components';

export default function MemberDetailScreen() {
    const { id } = useLocalSearchParams();
    const { state } = useAppData();
    const { colors, spacing, typography, radii } = useTheme();
    const router = useRouter();

    const member = state.members.find(m => m.id === id);

    if (!member) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary }}>
                <Text style={{ color: colors.text.primary }}>Member not found</Text>
                <Button title="Back" onPress={() => router.back()} style={{ marginTop: spacing.m }} />
            </View>
        );
    }

    const isActive = new Date(member.expiryDate) > new Date();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }}>
            <View style={{ padding: spacing.m }}>
                <SectionHeader title="Member Profile" />

                <Card style={{ padding: spacing.l, alignItems: 'center', gap: spacing.m }}>
                    {member.image ? (
                        <Image source={{ uri: member.image }} style={{ width: 120, height: 120, borderRadius: 60, marginBottom: spacing.m }} />
                    ) : (
                        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: colors.background.secondary, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.m }}>
                            <Text style={{ fontSize: 40 }}>👤</Text>
                        </View>
                    )}

                    <Text style={{ color: colors.text.primary, fontSize: typography.size.xl, fontWeight: 'bold' }}>{member.name}</Text>
                    <StatusBadge status={isActive ? 'Active' : 'Expired'} />

                    <View style={{ width: '100%', gap: spacing.s, marginTop: spacing.m }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text.secondary }}>Phone:</Text>
                            <Text style={{ color: colors.text.primary, fontWeight: '500' }}>{member.phone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text.secondary }}>Age:</Text>
                            <Text style={{ color: colors.text.primary, fontWeight: '500' }}>{member.age}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text.secondary }}>Plan:</Text>
                            <Text style={{ color: colors.text.primary, fontWeight: '500' }}>{member.plan}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text.secondary }}>Joined:</Text>
                            <Text style={{ color: colors.text.primary, fontWeight: '500' }}>{member.admissionDate}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text.secondary }}>Expires:</Text>
                            <Text style={{ color: colors.text.primary, fontWeight: '500' }}>{member.expiryDate}</Text>
                        </View>
                    </View>
                </Card>

                <Button title="Go Back" variant="ghost" onPress={() => router.back()} style={{ marginTop: spacing.l }} />
            </View>
        </ScrollView>
    );
}
