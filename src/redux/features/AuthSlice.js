import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api';

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// signUp function
export const signUp = createAsyncThunk('signUp', async(params, thunkApi) => {
  console.params('params', params)
  try {
    const response = await API.post('auth/signUp', params)
    console.log('respones', response)
    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkApi.rejectWithValue(error)
  }
})


// login function
// createAsyncThunk:  for data handling
export const login = createAsyncThunk('login', async (params, thunkApi) => {
  console.log('params', params);
  try {
    const response = await API.post('auth/login', params); // diff b/t params and params:
    console.log('params', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return thunkApi.rejectWithValue(error);
  }
});

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducer: {},
  extraReducers: builder => {
    //extraReducers for response in API us kay data ki handling kay leyee use krtay hay.
    // signUp cases 
    builder.addCase(signUp.pending, state => {
      state.isLoading = true;
    }) 
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
    // login Cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default AuthSlice.reducer;
