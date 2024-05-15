import {createSlice } from '@reduxjs/toolkit';

export interface commonState {
  loading: { [key: string]: boolean };
}
const initialState: commonState = {
  loading: {}
};

const commonSlice = createSlice({
  name: 'commonLoading',
  initialState,
  reducers: {
    toggleLoading(state, action: { payload: { key: string; value: boolean } }) {
      const { key, value } = action.payload;
      state.loading[key] = value;
    }
  }
});
export const { toggleLoading } = commonSlice?.actions;
export default commonSlice?.reducer;