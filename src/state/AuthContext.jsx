import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { AuthService } from '../services/auth';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload };
        case 'LOGIN_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'LOGOUT':
            return { ...initialState, isLoading: false };
        case 'RESTORE_TOKEN':
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload };
        case 'NO_TOKEN':
            return { ...state, isLoading: false, isAuthenticated: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const token = await storage.get('userToken');
                if (token) {
                    const user = await AuthService.getUser();
                    dispatch({ type: 'RESTORE_TOKEN', payload: user });
                } else {
                    dispatch({ type: 'NO_TOKEN' });
                }
            } catch (e) {
                dispatch({ type: 'NO_TOKEN' });
            }
        };

        bootstrapAsync();
    }, []);

    useEffect(() => {
        if (state.isLoading) return;

        const inAuthGroup = segments.includes('(auth)');

        if (!state.isAuthenticated && !inAuthGroup) {
            router.replace('/login');
        } else if (state.isAuthenticated && (inAuthGroup || segments.length === 0)) {
            router.replace('/dashboard');
        }
    }, [state.isAuthenticated, segments, state.isLoading]);

    const login = async (email, password) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            const { user, token } = await AuthService.login(email, password);
            // Using regular storage for token for now as per storage.jsx structure,
            // or switch to saveSecure if preferred. The error matches `storage.delete` not existing.
            // storage.jsx has `remove` and `deleteSecure`.
            // AuthContext attempts `storage.save` (exists) and `storage.delete` (DOES NOT EXIST).
            storage.save('userToken', token);
            dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
            throw error;
        }
    };

    const logout = async () => {
        await AuthService.logout();
        storage.remove('userToken'); // was storage.delete which is undefined
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
