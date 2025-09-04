import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// ============ LOGIN ============
export const handelLogin = createAsyncThunk(
  "auth/login",
  async (formValues: { email: string; password: string }) => {
    const options = {
      url: `https://linked-posts.routemisr.com/users/signin`,
      method: "POST",
      data: formValues,
    };
    const { data } = await axios(options);
    return data;
  }
);

// ============ REGISTER ============
export const handelRegister = createAsyncThunk(
  "auth/register",
  async (formValues: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) => {
    const options = {
      url: `https://linked-posts.routemisr.com/users/signup`,
      method: "POST",
      data: formValues,
    };
    const { data } = await axios(options);
    return data;
  }
);

const initialState: {
  token: string | null;
  userData: { name: string; _id: string; profile: string } | null;
  isLoading: boolean;
} = {
  token: null,
  userData: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearData: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    // ============ LOGIN ============
    builder.addCase(handelLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handelLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.success("Login success ✅");
    });
    builder.addCase(handelLogin.rejected, (state) => {
      state.isLoading = false;
      toast.error("Incorrect email or password ❌");
    });

    // ============ REGISTER ============
    builder.addCase(handelRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handelRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      toast.success("Register success ✅");
    });
    builder.addCase(handelRegister.rejected, (state, action) => {
      state.isLoading = false;
      toast.error("user already exists ❌");
    });
  },
});

export const authReducer = authSlice.reducer;
