import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as adsData from '../../services/adsData';
import { dispatch } from 'store';
import { toggleLoading } from './common';
const initialState = {
  ads: [],
  adsDetails: null,
  isLoading: false,
  error: '',
  count: 0,
  totalAdsRecord: []
};

export const getAllAdsData = createAsyncThunk('getAllAdsData', async () => {
  try {
    dispatch(toggleLoading({ key: 'adsTable', value: true }));
    const result = await adsData.getAllAdsData();
    dispatch(toggleLoading({ key: 'adsTable', value: false }));
    return result?.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'adsTable', value: false }));
  }
});
export const getAdsRecord = createAsyncThunk('getAdsRecord', async (count: number) => {
  try {
    dispatch(toggleLoading({ key: 'adsTable', value: true }));
    const result = await adsData.getAdsRecord(count);
    dispatch(toggleLoading({ key: 'adsTable', value: false }));
    return result?.data?.rows;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'adsTable', value: false }));
  }
});
export const getAdsDetails = createAsyncThunk('getAdsDetails', async (id: number) => {
  try {
    dispatch(toggleLoading({ key: 'getAdsDetails', value: true }));
    const result = await adsData.getAdsDetails(id);
    dispatch(setAdsDetails(result?.data));
    dispatch(toggleLoading({ key: 'getAdsDetails', value: false }));
    return result?.data;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'getAdsDetails', value: false }));
  }
});
export const toggleAdsBannerStatus = createAsyncThunk(
  'toggleAdsBannerStatus',
  async ({ id, banner }: { id: any; banner: boolean }, { dispatch }) => {
    try {
      dispatch(toggleLoading({ key: 'toggleAdsBannerStatus', value: true }));
      const result = await adsData.toggleAdsBannerStatus(id, banner);
      // dispatch(getAllAdsData());
      dispatch(toggleLoading({ key: 'toggleAdsBannerStatus', value: false }));
      return result;
    } catch (error) {
      throw error;
    } finally {
      dispatch(toggleLoading({ key: 'toggleAdsBannerStatus', value: false }));
    }
  }
);
export const toggleAdsDetailsBannerStatus = createAsyncThunk(
  'toggleAdsDetailsBannerStatus',
  async ({ id, banner }: { id: any; banner: boolean }, { dispatch }) => {
    try {
      dispatch(toggleLoading({ key: 'toggleAdsDetailsBannerStatus', value: true }));
      const result = await adsData.toggleAdsBannerStatus(id, banner);
      // dispatch(getAllAdsData());
      dispatch(toggleLoading({ key: 'toggleAdsDetailsBannerStatus', value: false }));
      return result;
    } catch (error) {
      throw error;
    } finally {
      dispatch(toggleLoading({ key: 'toggleAdsDetailsBannerStatus', value: false }));
    }
  }
);
export const toggleAdsStatus = createAsyncThunk('toggleAdsStatus', async ({ id, status }: { id: any; status: string }, { dispatch }) => {
  try {
    dispatch(toggleLoading({ key: 'toggleAdsStatus', value: true }));
    const result = await adsData.toggleAdsStatus(id, status);
    // dispatch(getAllAdsData());
    dispatch(toggleLoading({ key: 'toggleAdsStatus', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'toggleAdsStatus', value: false }));
  }
});
export const deleteAds = createAsyncThunk('deleteAds', async (id: any) => {
  try {
    dispatch(toggleLoading({ key: 'deleteAds', value: true }));
    const result = await adsData.deleteAds(id);
    dispatch(getAllAdsData());
    dispatch(toggleLoading({ key: 'deleteAds', value: false }));
    return result;
  } catch (error) {
    throw error;
  } finally {
    dispatch(toggleLoading({ key: 'deleteAds', value: false }));
  }
});

const adsSlice = createSlice({
  name: 'adsSlice',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.ads = action.payload;
    },
    setAdsDetails(state, action) {
      state.adsDetails = action.payload;
    },
    setTotalAdsRecord(state, action) {
      state.totalAdsRecord = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAdsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAdsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ads = action.payload.rows;
      state.count = action.payload.count;
    });
    builder.addCase(getAllAdsData.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getAdsRecord.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAdsRecord.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalAdsRecord = action.payload;
    });
    builder.addCase(getAdsRecord.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(getAdsDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAdsDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.adsDetails = action.payload;
    });
    builder.addCase(getAdsDetails.rejected, (state, action) => {
      state.isLoading = false;
      // state?.error = action?.error?.message;
    });
    builder.addCase(toggleAdsBannerStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleAdsBannerStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedAd = action?.payload?.data;
      state.adsDetails = {
        //@ts-ignore
        ...state.adsDetails,
        isBanner: action?.payload?.data?.isBanner
      };
      // @ts-ignore
      state.totalAdsRecord = state.totalAdsRecord.map((adUpdated: any) => (adUpdated?.id === updatedAd?.id ? state.adsDetails: adUpdated));
    });

    builder.addCase(toggleAdsBannerStatus.rejected, (state, action) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
    builder.addCase(toggleAdsDetailsBannerStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleAdsDetailsBannerStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedAd = action?.payload?.data;
      state.adsDetails = {
        //@ts-ignore
        ...state.adsDetails,
        isBanner: action?.payload?.data?.isBanner
      };
      // @ts-ignore
      state.totalAdsRecord = state.totalAdsRecord.map((adUpdated: any) => (adUpdated?.id === updatedAd?.id ? state.adsDetails : adUpdated));
    });

    builder.addCase(toggleAdsDetailsBannerStatus.rejected, (state, action) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
    builder.addCase(toggleAdsStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleAdsStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedAd = action?.payload?.data;
      // console.log('action id user');
      state.adsDetails = {
        //@ts-ignore
        ...state.adsDetails,
        status: action?.payload?.data?.status
      };
      // @ts-ignore
      state.totalAdsRecord = state.totalAdsRecord.map((adUpdated: any) => (adUpdated?.id === updatedAd?.id ? state.adsDetails : adUpdated));
    });
    builder.addCase(toggleAdsStatus.rejected, (state, action) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
    builder.addCase(deleteAds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAds.fulfilled, (state, action) => {
      state.isLoading = false;
      const deletedAdId = action.payload.id;
      // @ts-ignore
      state.totalAdsRecord = state?.totalAdsRecord?.filter((ad) => ad?.id !== deletedAdId);
    });
    builder.addCase(deleteAds.rejected, (state) => {
      state.isLoading = false;
      // state.isError = action.payload;
    });
  }
});
export const { setAllUsers, setAdsDetails, setTotalAdsRecord } = adsSlice.actions;
export default adsSlice.reducer;
