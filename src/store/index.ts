import {configureStore} from "@reduxjs/toolkit";
import usersSlice from './slice';

const store = configureStore({
    reducer: {
        users: usersSlice,
    },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

