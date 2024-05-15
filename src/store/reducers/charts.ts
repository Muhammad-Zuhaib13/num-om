import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as chartsData from '../../services/chartsData';
import { dispatch } from 'store';
import { toggleLoading } from './common';
const initialState = {
  lastWeek: null,
  lastMonth: null,
  currentYear: null,
  isLoading: false,
  totalUsersChart: null,
  totalAdsChart: null,
  error: ''
};
export const getChartDataLastWeek = createAsyncThunk('getChartDataLastWeek', async () => {
  try {
    dispatch(toggleLoading({ key: 'charts', value: true }));
    const result = await chartsData.getChartDataLastWeek();
    dispatch(toggleLoading({ key: 'charts', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'charts', value: false }));
  }
});
export const getChartDataLastMonth = createAsyncThunk('getChartDataLastMonth', async () => {
  try {
    dispatch(toggleLoading({ key: 'charts', value: true }));
    const result = await chartsData.getChartDataLastMonth();
    dispatch(toggleLoading({ key: 'charts', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'charts', value: false }));
  }
});
export const getChartDataCurrentYear = createAsyncThunk('getChartDataCurrentYear', async () => {
  try {
    dispatch(toggleLoading({ key: 'charts', value: true }));
    const result = await chartsData.getChartDataCurrentYear();
    dispatch(toggleLoading({ key: 'charts', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'charts', value: false }));
  }
});
export const getChartDataTotalUsers = createAsyncThunk('getChartDataTotalUsers', async () => {
  try {
    dispatch(toggleLoading({ key: 'usersChart', value: true }));
    const result = await chartsData.getChartDataTotalUsers();
    dispatch(toggleLoading({ key: 'usersChart', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'usersChart', value: false }));
  }
});
export const getChartDataTotalAds = createAsyncThunk('getChartDataTotalAds', async () => {
  try {
    dispatch(toggleLoading({ key: 'adsChart', value: true }));
    const result = await chartsData.getChartDataTotalAds();
    dispatch(toggleLoading({ key: 'adsChart', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'adsChart', value: false }));
  }
});
const chartsSlice = createSlice({
  name: 'chartsSlice',
  initialState,
  reducers: {
    setLastWeek(state, action) {
      state.lastWeek = action.payload;
    },
    setLastMonth(state, action) {
      state.lastMonth = action.payload;
    },
    setCurrentYear(state, action) {
      state.currentYear = action.payload;
    },
    setTotalUsers(state, action) {
      state.totalUsersChart = action.payload;
    },
    setTotalAds(state, action) {
      state.totalAdsChart = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChartDataLastWeek.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartDataLastWeek.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastWeek = action.payload;
    });
    builder.addCase(getChartDataLastWeek.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getChartDataLastMonth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartDataLastMonth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastMonth = action.payload;
    });
    builder.addCase(getChartDataLastMonth.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getChartDataCurrentYear.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartDataCurrentYear.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentYear = action.payload;
    });
    builder.addCase(getChartDataCurrentYear.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getChartDataTotalUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartDataTotalUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalUsersChart = action.payload;
    });
    builder.addCase(getChartDataTotalUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getChartDataTotalAds.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getChartDataTotalAds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalAdsChart = action.payload;
    });
    builder.addCase(getChartDataTotalAds.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});
export const { setLastWeek, setLastMonth, setCurrentYear, setTotalUsers, setTotalAds } = chartsSlice.actions;
export default chartsSlice.reducer;
