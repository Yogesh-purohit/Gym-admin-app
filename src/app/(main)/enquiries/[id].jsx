import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppData } from '../../../state/AppDataContext';
import { useTheme } from '../../../theme';
import { Card, SectionHeader, StatusBadge, Button } from '../../../components';

export default function EnquiryDetailScreen() {
    const { id } = useLocalSearchParams();
    const { state, actions } = useAppData();
    const { colors, spacing, typography } = useTheme();
    const router = useRouter();

    const enquiry = state.enquiries.find(e => e.id === id);

    if (!enquiry) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary }}>
                <Text style={{ color: colors.text.primary }}>Enquiry not found</Text>
                <Button title="Back" onPress={() => router.back()} style={{ marginTop: spacing.m }} />
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background.primary }}>
            <View style={{ padding: spacing.m }}>
                <SectionHeader title="Enquiry Details" />

                <Card style={{ padding: spacing.l, gap: spacing.m }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: colors.text.primary, fontSize: typography.size.xl, fontWeight: 'bold' }}>{enquiry.name}</Text>
                        <StatusBadge status={enquiry.status} />
                    </View>

                    <View style={{ gap: spacing.xs }}>
                        <Text style={{ color: colors.text.secondary }}>Phone: {enquiry.phone}</Text>
                        <Text style={{ color: colors.text.secondary }}>Source: {enquiry.source}</Text>
                        <Text style={{ color: colors.text.secondary }}>Next Follow-up: {enquiry.nextFollowUpDate}</Text>
                        <Text style={{ color: colors.text.tertiary, fontSize: typography.size.xs }}>Created: {new Date(enquiry.createdAt).toLocaleString()}</Text>
                    </View>

                    {enquiry.status !== 'Converted' && (
                        <Button
                            title="Convert to Member"
                            onPress={() => router.push({
                                pathname: '/(main)/members',
                                params: { convert: 'true', name: enquiry.name, phone: enquiry.phone, enquiryId: enquiry.id }
                            })}
                        />
                    )}
                </Card>

                <Button title="Go Back" variant="ghost" onPress={() => router.back()} style={{ marginTop: spacing.l }} />
            </View>
        </ScrollView>
    );
}
