import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../../api';

const initialState = {
  products: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};
// createAsyncThunk:  for data handling
export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async thunkApi => {
    try {
      const response = await API.get('products', params); // diff b/t params and params:
      console.log('params', response);
      return response.data;
    } catch (error) {
      console.log('error', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

const ProductsSlice = createSlice({
  name: 'ProductsSlice',
  initialState,
  reducer: {},
  extraReducers: builder => {
    //extraReducers for response in API us kay data ki handling kay leyee use krtay hay.
    // login Cases
    builder.addCase(getAllProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default ProductsSlice.reducer;
