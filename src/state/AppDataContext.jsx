import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { MembersService } from '../services/members';
import { AttendanceService } from '../services/attendance';
import { EnquiriesService } from '../services/enquiries';

const AppDataContext = createContext(null);

const Services = {
    members: MembersService,
    attendance: AttendanceService,
    enquiries: EnquiriesService,
};

const initialState = {
    members: [],
    attendance: [],
    enquiries: [],
    loading: {
        members: false,
        attendance: false,
        enquiries: false,
    },
    error: null,
};

const reducer = (state, action) => {
    // Safety check for unknown modules
    if (action.module && !state.hasOwnProperty(action.module) && action.type !== 'SET_LOADING' && action.type !== 'SET_ERROR') {
        console.warn(`AppDataContext: Unknown module "${action.module}"`);
        return state;
    }

    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: { ...state.loading, [action.module]: action.isLoading }
            };
        case 'SET_DATA':
            return {
                ...state,
                [action.module]: Array.isArray(action.data) ? action.data : [],
                loading: { ...state.loading, [action.module]: false }
            };
        case 'ADD_ITEM':
            return {
                ...state,
                [action.module]: [action.item, ...(state[action.module] || [])],
                loading: { ...state.loading, [action.module]: false }
            };
        case 'UPDATE_ITEM':
            return {
                ...state,
                [action.module]: (state[action.module] || []).map(i => i.id === action.id ? action.item : i),
                loading: { ...state.loading, [action.module]: false }
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                [action.module]: (state[action.module] || []).filter(i => i.id !== action.id),
                loading: { ...state.loading, [action.module]: false }
            };
        case 'SET_ERROR':
            return { ...state, error: action.error, loading: { ...state.loading, [action.module]: false } };
        default:
            return state;
    }
};

export const AppDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        fetchData: useCallback(async (module) => {
            dispatch({ type: 'SET_LOADING', module, isLoading: true });
            try {
                const data = await Services[module].getAll();
                dispatch({ type: 'SET_DATA', module, data });
            } catch (e) {
                dispatch({ type: 'SET_ERROR', module, error: e.message });
            }
        }, []),

        createItem: useCallback(async (module, data) => {
            dispatch({ type: 'SET_LOADING', module, isLoading: true });
            try {
                const item = await Services[module].create(data);
                dispatch({ type: 'ADD_ITEM', module, item });
            } catch (e) {
                dispatch({ type: 'SET_ERROR', module, error: e.message });
            }
        }, []),

        updateItem: useCallback(async (module, id, data) => {
            dispatch({ type: 'SET_LOADING', module, isLoading: true });
            try {
                const item = await Services[module].update(id, data);
                dispatch({ type: 'UPDATE_ITEM', module, id, item });
            } catch (e) {
                dispatch({ type: 'SET_ERROR', module, error: e.message });
            }
        }, []),

        deleteItem: useCallback(async (module, id) => {
            dispatch({ type: 'SET_LOADING', module, isLoading: true });
            try {
                await Services[module].delete(id);
                dispatch({ type: 'DELETE_ITEM', module, id });
            } catch (e) {
                dispatch({ type: 'SET_ERROR', module, error: e.message });
            }
        }, []),
    };

    return (
        <AppDataContext.Provider value={{ state, actions }}>
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => useContext(AppDataContext);
