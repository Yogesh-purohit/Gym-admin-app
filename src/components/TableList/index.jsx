import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { useTheme } from '../../theme';
import { Card } from '../Card';

export const TableList = ({
    data,
    renderItem,
    keyExtractor,
    onRefresh,
    refreshing,
    ListHeaderComponent,
    emptyMessage = "No data available",
}) => {
    const { colors, spacing, typography } = useTheme();

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text.tertiary }]}>
                {emptyMessage}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ padding: spacing.m, gap: spacing.m }}
            refreshControl={
                onRefresh ? (
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                ) : undefined
            }
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
        />
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
});
