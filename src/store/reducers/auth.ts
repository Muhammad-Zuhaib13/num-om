import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as AuthService from '../../services/authServices';
import { dispatch } from 'store';
import { toggleLoading } from './common';
const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: '',
  token: '',
  changePasswordStauts: false
};
export const loginAdmin = createAsyncThunk('loginAdmin', async (values: any) => {
  try {
    dispatch(toggleLoading({ key: 'admin', value: true }));
    const result = await AuthService.loginAdmin(values);
    const { data } = result;
    dispatch(setUser(data));
    dispatch(setToken(data?.token));
    dispatch(toggleLoading({ key: 'admin', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'admin', value: false }));
  }
});
export const updateAdminProfile = createAsyncThunk('updateAdminProfile', async (values: any) => {
  try {
    dispatch(toggleLoading({ key: 'admin', value: true }));
    const result = await AuthService.updateAdminProfile(values);
    dispatch(toggleLoading({ key: 'admin', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'admin', value: false }));
  }
});
export const updateAdminPassword = createAsyncThunk('updateAdminPassword', async (values: any) => {
  try {
    dispatch(toggleLoading({ key: 'updateAdminPassword', value: true }));
    const result = await AuthService.updateAdminPassword(values);
    // console.log('Status of change password', result?.success);
    localStorage.removeItem('token');
    dispatch(clearUser());
    dispatch(toggleLoading({ key: 'updateAdminPassword', value: false }));
    return result?.success;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'updateAdminPassword', value: false }));
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearUser: (state) => {
      localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.user = null;
    },
    setChangePasswordStauts: (state, action) => {
      state.changePasswordStauts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(loginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(updateAdminProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdminProfile.fulfilled, (state, action) => {
      state.user = {
        // @ts-ignore
        ...state.user,
        full_name: action.payload?.data?.full_name,
        phone: action.payload?.data?.phone
      };
      state.isLoading = false;
    });
    builder.addCase(updateAdminProfile.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(updateAdminPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdminPassword.fulfilled, (state, action) => {
      state.changePasswordStauts = action?.payload;
      state.isLoading = false;
    });
    builder.addCase(updateAdminPassword.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
  }
});
export const { setUser, setToken, clearUser, setChangePasswordStauts } = authSlice?.actions;
export default authSlice?.reducer;
