import { storage } from '../utils/storage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CACHE_KEY = '@gym_members';

// Mock initial data if storage is empty
const initialMembers = [
    { id: '1', name: 'John Doe', phone: '1234567890', age: 28, plan: 'Gold', admissionDate: '2023-01-01', expiryDate: '2024-01-01' },
    { id: '2', name: 'Jane Smith', phone: '0987654321', age: 34, plan: 'Silver', admissionDate: '2023-05-15', expiryDate: '2023-11-15' },
    { id: '3', name: 'Mike Johnson', phone: '1122334455', age: 24, plan: 'Platinum', admissionDate: '2023-08-01', expiryDate: '2024-08-01' },
];

const getMembers = () => {
    return storage.get(CACHE_KEY, initialMembers);
};

export const MembersService = {
    getAll: async () => {
        await delay(500);
        return getMembers();
    },

    create: async (data) => {
        await delay(500);
        const members = getMembers();
        const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) };
        members.unshift(newItem);
        storage.save(CACHE_KEY, members);
        return newItem;
    },

    update: async (id, data) => {
        await delay(500);
        let members = getMembers();
        members = members.map(item => item.id === id ? { ...item, ...data } : item);
        storage.save(CACHE_KEY, members);
        return members.find(item => item.id === id);
    },

    delete: async (id) => {
        await delay(500);
        let members = getMembers();
        members = members.filter(item => item.id !== id);
        storage.save(CACHE_KEY, members);
        return id;
    }
};
