import { storage } from '../utils/storage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CACHE_KEY = '@gym_enquiries';

const initialEnquiries = [
    { id: '1', name: 'Alice Brown', phone: '555-0101', source: 'Instagram', nextFollowUpDate: '2023-10-28', status: 'Pending', createdAt: new Date().toISOString() },
    { id: '2', name: 'Bob Wilson', phone: '555-0102', source: 'Referral', nextFollowUpDate: '2023-10-26', status: 'Called', createdAt: new Date().toISOString() },
];

const getEnquiries = () => {
    return storage.get(CACHE_KEY, initialEnquiries);
};

export const EnquiriesService = {
    getAll: async () => {
        await delay(500);
        return getEnquiries();
    },

    create: async (data) => {
        await delay(500);
        const enquiries = getEnquiries();
        const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) };
        enquiries.unshift(newItem);
        storage.save(CACHE_KEY, enquiries);
        return newItem;
    },

    update: async (id, data) => {
        await delay(500);
        let enquiries = getEnquiries();
        enquiries = enquiries.map(item => item.id === id ? { ...item, ...data } : item);
        storage.save(CACHE_KEY, enquiries);
        return enquiries.find(item => item.id === id);
    },

    delete: async (id) => {
        await delay(500);
        let enquiries = getEnquiries();
        enquiries = enquiries.filter(item => item.id !== id);
        storage.save(CACHE_KEY, enquiries);
        return id;
    }
};
