import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        reloadUser: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        ReloadUser: (state, action) => {
            state.reloadUser = action.payload;
        },
    },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
