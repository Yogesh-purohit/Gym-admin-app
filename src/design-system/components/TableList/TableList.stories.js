import React from 'react';
import { Box, Text, Card } from '../../primitives';
import { Card as AppCard } from '../Card';
import { TableList } from './index';

export default {
    title: 'Design System/Components/TableList',
    component: TableList,
};

const data = [
    { id: '1', title: 'Item 1', description: 'Description for item 1' },
    { id: '2', title: 'Item 2', description: 'Description for item 2' },
    { id: '3', title: 'Item 3', description: 'Description for item 3' },
];

const renderItem = ({ item }) => (
    <AppCard>
        <Text fontWeight="bold">{item.title}</Text>
        <Text color="text.secondary">{item.description}</Text>
    </AppCard>
);

export const Basic = {
    args: {
        data,
        renderItem,
        keyExtractor: (item) => item.id,
    },
};

export const Empty = {
    args: {
        data: [],
        renderItem,
        keyExtractor: (item) => item.id,
        emptyMessage: 'Nothing to see here',
    },
};
