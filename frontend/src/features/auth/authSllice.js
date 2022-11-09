import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const initialState = {
 user:"srujan",
 isError:false,
 isSuccess:false,
 isLoading:false,
 message:'',
};

//register
export const register =createAsyncThunk('auth/register',async (user,thunkAPI)=>{

  console.log(user)

})

//login

export const login =createAsyncThunk('auth/login',async (user,thunkAPI)=>{

  console.log(user)

})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
