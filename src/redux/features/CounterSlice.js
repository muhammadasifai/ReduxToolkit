import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Value: 0,
};

const CounterSlice = createSlice({
  name: 'counterSlice',
  initialState,
  reducers: {
    increment: state => {
      state.Value += 1;
    },
    decrement: state => {
      state.Value -= 1;
    },
    incrementByAmount: (state, actions) => {
      state.Value = actions.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = CounterSlice.actions;
export default CounterSlice.reducer;
