
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./services/authApi";


interface authState {
    user: User | null;
    isAuth :boolean;
}
const initialState: authState = {
    user:null,
    isAuth:false
}
const  authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser : (state,action:PayloadAction<User>) =>{
         state.user = action.payload;
         state.isAuth = true;
        },
        clearUser : (state) =>{
         state.user = null;
         state.isAuth = false;
        }
    }
})
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;