import { storage } from '../utils/storage';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CACHE_KEY = '@gym_attendance';

const getAttendance = () => {
    return storage.get(CACHE_KEY, []);
};

export const AttendanceService = {
    getAll: async () => {
        await delay(300);
        return getAttendance();
    },

    create: async (data) => {
        await delay(300);
        const attendance = getAttendance();
        const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) };
        attendance.unshift(newItem);
        storage.save(CACHE_KEY, attendance);
        return newItem;
    },

    update: async (id, data) => {
        await delay(300);
        let attendance = getAttendance();
        attendance = attendance.map(item => item.id === id ? { ...item, ...data } : item);
        storage.save(CACHE_KEY, attendance);
        return attendance.find(item => item.id === id);
    },

    delete: async (id) => {
        await delay(300);
        let attendance = getAttendance();
        attendance = attendance.filter(item => item.id !== id);
        storage.save(CACHE_KEY, attendance);
        return id;
    },

    getStats: async () => {
        await delay(300);
        const attendance = getAttendance();
        const today = new Date().toISOString().split('T')[0];
        const todaysAttendance = attendance.filter(a => a.date === today);
        return {
            present: todaysAttendance.filter(a => a.status === 'Present').length,
            absent: todaysAttendance.filter(a => a.status === 'Absent').length,
        };
    }
};
