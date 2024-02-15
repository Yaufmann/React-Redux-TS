import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface Register {
    id: number,
    token: string
}

interface Login {
    token: string
}

export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

interface Data {
    email: string,
    password: string
}

export const fetchUsers = createAsyncThunk<User[],undefined,{rejectValue: string}>(
    'users/fetchUsers',
    async function(_,{rejectWithValue}) {
        return fetch('https://reqres.in/api/users?page=2')
            .then(res=>res.json())
            .then(json=>json.data)
            .catch(()=>rejectWithValue('Server Error'))
    }
);

export const fetchUserId = createAsyncThunk<User,string,{rejectValue: string}>(
    'users/fetchUsersId',
    async function(userId,{rejectWithValue}) {
        return fetch(`https://reqres.in/api/users/${userId}`)
            .then(res=>res.json())
            .then(json=>json.data)
            .catch(()=>rejectWithValue('Server Error'))
    }
);

export const fetchRegister = createAsyncThunk<Register,Data,{rejectValue: string}>(
    'users/fetchRegister',
    async function({email,password},{rejectWithValue}) {
        const options = {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json',
            },
            body: JSON.stringify({email,password})
        }

        return fetch(`https://reqres.in/api/register`, options)
            .then(res=>res.json())
            .catch(()=>rejectWithValue('Server Error'))
    }
);

export const fetchLogin = createAsyncThunk<Login,Data,{rejectValue: string}>(
    'users/fetchLogin',
    async function({email,password},{rejectWithValue}) {

        const options = {
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
                'accept' : 'application/json',
            },
            body: JSON.stringify({email,password})
        }

        return fetch(`https://reqres.in/api/login`, options)
            .then(res=>res.json())
            .catch(()=>rejectWithValue('Server Error'))
    }
);



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: <User[]>[],
        user: <User>{},
        token: localStorage.getItem('token') ?? '',
        // loading: false,
        // error: null
    },
    reducers: {
        logOut(state) {
            state.token = '';
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder)=> {

        builder.addCase(fetchUsers.pending, ()=> {
            // state.loading = true;
            // state.error = null;
        });

        builder.addCase(fetchUsers.fulfilled,(state, action) => {
            // state.loading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchUsers.rejected,() => {
            // state.loading = false;
            // state.error = action.payload;
        });

        builder.addCase(fetchUserId.fulfilled,(state, action) => {
            // state.loading = false;
            state.user = action.payload;
        });

        builder.addCase(fetchRegister.fulfilled,(state, action) => {
            // state.loading = false;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        });

        builder.addCase(fetchLogin.fulfilled,(state, action) => {
            // state.loading = false;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
        });
    },
});
export const {logOut} = usersSlice.actions;
export default usersSlice.reducer;