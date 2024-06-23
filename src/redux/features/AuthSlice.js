import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api';

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  tokens: {
    access_token: null,
    refresh_token: null,
  },
  errorMessage: '',
};
// createAsyncThunk:  for data handling
export const login = createAsyncThunk('login', async (params, thunkApi) => {
  console.log('params', params);
  try {
    const response = await API.post('user/login', params); // diff b/t params and params:
    console.debug('🟢 ~ login ~ response.status:', response.status); // for checking api status
    console.log('response', response.data); // for checking json response
    if (response.data?.access_token) {
      // TODO 2: save token to my initial state
      // TODO 1: call get user data api with header (access token)
      thunkApi.dispatch(
        getUserData({access_token: response.data?.access_token}),
      );
    }
    return response.data;
  } catch (error) {
    console.debug('🟢 ~ login ~ error:', error.response.data);
    console.log('error', error);
    console.debug(
      '🟢 ~ login ~ error.response.data?.message:',
      error.response.data?.message,
    );
    return thunkApi.rejectWithValue(error.response.data?.message);
  }
});

export const getUserData = createAsyncThunk(
  'getUserData',
  async (params, thunkApi) => {
    console.log('params', params);
    try {
      const response = await API.get('user/info', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${params?.access_token}`,
        },
      });
      console.debug('🟢 ~ login ~ getUserData:', response.data);
      let obj = {
        userData: response.data,
        access_token: params?.access_token,
      };
      return obj; // returning object to cases
    } catch (error) {
      console.log('error', error);
      return thunkApi.rejectWithValue(error.response.data?.message);
    }
  },
);

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    logout: () => {
      // clear();
      return initialState;
    },
    resetErrorMessage: state => {
      state.errorMessage = '';
    },
  },
  extraReducers: builder => {
    //extraReducers for response in API us kay data ki handling kay leyee use krtay hay.
    // login Cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.debug('🟢 ~ builder.addCase ~ action:', action);
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
    // get User Data Cases
    builder.addCase(getUserData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      console.debug('🟢 ~ builder.addCase ~ action:', action.payload);
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      console.debug('🟢 ~ builder.addCase ~ action:', action);
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default AuthSlice.reducer;

export const {logout, resetErrorMessage} = AuthSlice.actions;
