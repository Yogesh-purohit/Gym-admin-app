import "expo-sqlite/localStorage/install";
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Simple storage helper using localStorage polyfill as recommended
// This persists data across app reloads.
export const storage = {
    // For large JSON data like members, enquiries
    get: (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error('Storage Get Error:', e);
            return defaultValue;
        }
    },

    save: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage Save Error:', e);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage Remove Error:', e);
        }
    },

    // For sensitive data like tokens
    saveSecure: async (key, value) => {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    },

    getSecure: async (key) => {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    },

    deleteSecure: async (key) => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    }
};
