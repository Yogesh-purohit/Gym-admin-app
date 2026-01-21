import React from 'react';
import { Text, View } from 'react-native';
import { TableList } from './index';
import { Card } from '../Card';

export default {
    title: 'Components/TableList',
    component: TableList,
};

const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
];

const renderItem = ({ item }) => (
    <Card>
        <Text>{item.title}</Text>
    </Card>
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
