import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name:"login",
    initialState: {
        user:{
            id:'',
            name:'',
            email:'',
            isLogged:false,
            isAdmin:false,
        }
      },
    reducers:{
        userLogin:(state,action)=>{
           let {id,name,email,isadmin} = action.payload;
           state.user.id = id;
           state.user.name = name;
           state.user.email=email;
           state.user.isLogged = true;  
           state.user.isAdmin=isadmin;          
        },
        userLogout:(state)=>{
            state.user.id = '';
            state.user.name = '';
            state.user.email='';
            state.user.isLogged = false;   
        }
    },
});

export const {userLogin,userLogout} = loginSlice.actions;
export default loginSlice.reducer;