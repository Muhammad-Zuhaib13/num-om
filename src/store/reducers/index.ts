// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import auth from './auth';
import menu from './menu';
import snackbar from './snackbar';
import chartsSlice from './charts';
import usersSlice from './users';
import adsSlice from './ads';
import common from './common';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  usersSlice,
  adsSlice,
  common,
  // auth,
  auth: persistReducer(
    {
      key: 'auth',
      storage
    },
    auth
  ),
  chartsSlice,
});

export default reducers;
