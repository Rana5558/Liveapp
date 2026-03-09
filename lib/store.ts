import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import uiReducer from './features/ui/uiSlice';
import chatReducer from './features/chat/chatSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            ui: uiReducer,
            chat: chatReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
