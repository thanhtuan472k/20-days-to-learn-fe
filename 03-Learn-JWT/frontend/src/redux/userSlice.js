import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        mgs: ''
    },
    reducers: {
        getUsersStart: state => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: state => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUsersStart: state => {
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.mgs = action.payload;
        },
        deleteUsersFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.mgs = action.payload;
        }
    }
});

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailed
} = userSlice.actions;

export default userSlice.reducer;
