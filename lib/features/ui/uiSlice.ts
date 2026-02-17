import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    activeFAQIndex: number | null;
    isMobileMenuOpen: boolean;
}

const initialState: UIState = {
    activeFAQIndex: 0,
    isMobileMenuOpen: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setActiveFAQIndex: (state, action: PayloadAction<number | null>) => {
            state.activeFAQIndex = action.payload;
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = action.payload;
        },
    },
});

export const { setActiveFAQIndex, toggleMobileMenu, setMobileMenuOpen } = uiSlice.actions;
export default uiSlice.reducer;
