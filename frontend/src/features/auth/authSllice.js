import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authservice from "./authService";

// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: "Srujan",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//register
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // console.log(user);

    try {
      return await authservice.register(user);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  console.log(user);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(register.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(register.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.user = action.payload;
    //   })
    //   .addCase(register.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //     state.user = null;
    //   })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
