import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api';

const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  token: {
    acess_token: null,
    refresh_token: null,
  },
  errorMessage: '',
};

// signUp function
export const signUp = createAsyncThunk('signUp', async(params, thunkApi) => {
  console.params('params', params)
  try {
    const response = await API.post('user/signup', params)
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
    const response = await API.post('user/login', params); // diff b/t params and params:
    console.debug('login, response.status:', response.status);
    console.log('response', response.data);
    if (response.data?.acess_token) {
      thunkApi.dispatch(getUserData({acess_token: response.data?.acess_token}))
    }
    return response.data;
  } catch (error) {
    console.debug('login-error:', error.response.data)
    console.log('error', error);
    console.debug('login- error.response.data?.message', error.response.data?.message)
    return thunkApi.rejectWithValue(error.response.data?.message);
  }
});

export const getUserData = createAsyncThunk('getUserData', async(params, thunkApi) => {
  console.log('params', params);
  try {
    const respones = await API.get('user/info', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${params?.acess_token}`,
      }
    })
    console.debug('login - getUserData:', respones.data);
    let obj = {
      userData: respones.data,
      acess_token: params?.acess_token,
    }
    return obj;
  } catch (error) {
    console.log('error', error)
    return thunkApi.rejectWithValue(error.respones.data?.message)
  }
})

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    logout: () => {
      // clear ();
      return initialState;
    },
    resetErrorMessage: state => {
      state.errorMessage = '';
    },
  },
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
    // get User Data Cases
    builder.addCase(getUserData.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    });
  },
});

export default AuthSlice.reducer;

export const {logout, resetErrorMessage} = AuthSlice.actions;
