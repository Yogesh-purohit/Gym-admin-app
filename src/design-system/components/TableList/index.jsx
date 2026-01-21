import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useTheme } from '../../context/ThemeProvider';
import { Box, Text } from '../../primitives';

export const TableList = ({
    data,
    renderItem,
    keyExtractor,
    onRefresh,
    refreshing,
    ListHeaderComponent,
    emptyMessage = "No data available",
    padding = "m",
    gap = "m",
    ...props
}) => {
    const { colors, spacing } = useTheme();

    const renderEmpty = () => (
        <Box padding="xxl" align="center" justify="center">
            <Text color="text.tertiary" fontSize="m">
                {emptyMessage}
            </Text>
        </Box>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
                padding: spacing[padding] ?? padding,
                gap: spacing[gap] ?? gap
            }}
            refreshControl={
                onRefresh ? (
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                ) : undefined
            }
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            {...props}
        />
    );
};
