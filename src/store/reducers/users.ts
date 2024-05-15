import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as usersData from '../../services/usersData';
import { dispatch, useSelector } from 'store';
import { toggleLoading } from './common';
const initialState = {
  users: [],
  userDetails: null,
  isLoading: false,
  error: '',
  totalUserRecord: [],
  count: 0
};
export const getAllUsersData = createAsyncThunk('getAllUsersData', async () => {
  try {
    dispatch(toggleLoading({ key: 'usersTable', value: true }));
    const result = await usersData.getAllUsersData();
    dispatch(toggleLoading({ key: 'usersTable', value: false }));
    return result?.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'usersTable', value: false }));
  }
});
export const getUsersRecord = createAsyncThunk('getUsersRecord', async (count: number) => {
  try {
    dispatch(toggleLoading({ key: 'usersTable', value: true }));
    const result = await usersData.getUsersRecord(count);
    dispatch(toggleLoading({ key: 'usersTable', value: false }));
    return result?.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'usersTable', value: false }));
  }
});
export const getUserDetails = createAsyncThunk('getUserDetails', async (id: number) => {
  try {
    dispatch(toggleLoading({ key: 'userDetails', value: true }));
    const result = await usersData.getUserDetails(id);
    dispatch(setUserDetails(result?.data));
    dispatch(toggleLoading({ key: 'userDetails', value: false }));
    return result?.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'userDetails', value: false }));
  }
});
export const toggleUserStatus = createAsyncThunk('toggleUserStatus', async ({ id, is_active }: { id: any; is_active: boolean }) => {
  try {
    dispatch(toggleLoading({ key: 'toggleStatus', value: true }));
    const result = await usersData.toggleUserStatus(id, is_active);
    dispatch(toggleLoading({ key: 'toggleStatus', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'toggleStatus', value: false }));
  }
});
export const changeUserStatus = createAsyncThunk('changeUserStatus', async ({ id, is_active }: { id: any; is_active: boolean }) => {
  try {
    dispatch(toggleLoading({ key: 'toggleStatus', value: true }));
    const result = await usersData.changeUserStatus(id, is_active);
    dispatch(toggleLoading({ key: 'toggleStatus', value: false }));
    return result;
  } catch (error) {
    throw error;
  }
  finally {
    dispatch(toggleLoading({ key: 'toggleStatus', value: false }));
  }
});
export const deleteUser = createAsyncThunk('deleteUser', async (id: any) => {
  try {
    dispatch(toggleLoading({ key: 'deleteUser', value: true }));
    const result = await usersData.deleteUser(id);
    dispatch(getAllUsersData());
    dispatch(toggleLoading({ key: 'deleteUser', value: false }));
    return result;
  } catch (error) {
    throw error;
  }
  finally{
    dispatch(toggleLoading({ key: 'deleteUser', value: false }));
  }
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.users = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    editUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setTotalUserRecord(state, action) {
      state.totalUserRecord = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsersData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsersData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.rows;
      state.count = action.payload.count;
    });
    builder.addCase(getAllUsersData.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getUsersRecord.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalUserRecord = action.payload.rows;
      // state.count = action.payload.count;
    });
    builder.addCase(getUsersRecord.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
      // const updatedUser = action?.payload?.data;
      // // @ts-ignore
      // state.totalUserRecord = state.totalUserRecord.map((userUpdated: any) =>
      //   userUpdated?.id === updatedUser?.id ? updatedUser : userUpdated
      // );
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(toggleUserStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleUserStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = {
        //@ts-ignore
        ...state.userDetails,
        is_active: action?.payload?.data?.is_active
      };
      const updatedUser = action?.payload?.data;
      // console.log('id of updated user is ', updatedUser?.id);
      // @ts-ignore
      state.totalUserRecord = state.totalUserRecord.map((userUpdated: any) =>
        userUpdated.id === updatedUser?.id ? state.userDetails : userUpdated
      );
      // console.log('The updated status of user is ', state?.totalUserRecord);
    });
    builder.addCase(toggleUserStatus.rejected, (state, action) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
    builder.addCase(changeUserStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeUserStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedUser = action?.payload?.data;
      state.userDetails = {
        //@ts-ignore
        ...state.userDetails,
        is_active: action?.payload?.data?.is_active
      };
      // console.log('id of updated user is ', updatedUser?.id);
      // @ts-ignore
      state.totalUserRecord = state.totalUserRecord.map((userUpdated: any) =>
        userUpdated?.id === updatedUser?.id ? state.userDetails : userUpdated
      );
      // console.log('The updated status of user is ', state?.totalUserRecord);
    });
    builder.addCase(changeUserStatus.rejected, (state, action) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      const deletedUserId = action.payload.id;
      // @ts-ignore
      state.totalUserRecord = state.totalUserRecord.filter((user) => user?.id !== deletedUserId);
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
  }
});
export const { setAllUsers, setUserDetails, setTotalUserRecord } = usersSlice.actions;
export default usersSlice.reducer;
