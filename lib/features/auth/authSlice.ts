import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/apiClient';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'doctor' | null;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password?: string }, { rejectWithValue }) => {
        try {
            // Simulating API call for now since we don't have a real backend endpoint provided
            // In a real scenario, this would be: await apiClient.post<User>('/auth/login', credentials);
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock response logic based on email prefix
            const isPatient = credentials.email.includes('patient');
            const mockUser: User = {
                id: isPatient ? '2' : '1',
                name: isPatient ? 'Patient User' : 'Doctor User',
                email: credentials.email,
                role: isPatient ? 'patient' : 'doctor'
            };

            // Set cookies for middleware
            if (typeof window !== 'undefined') {
                document.cookie = `auth_token=mock_token; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
                document.cookie = `user_role=${mockUser.role}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
            }

            return mockUser;
        } catch (error: unknown) {
            const message =
                error instanceof Error ? error.message : 'Login failed';
            return rejectWithValue(message);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            // Clear cookies
            if (typeof window !== 'undefined') {
                document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
