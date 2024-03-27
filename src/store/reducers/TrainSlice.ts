import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITrain } from "../../types/interfaces";


interface TrainState {
  trains: ITrain[];
  isLoading: boolean;
  error: string;
}
const initialState: TrainState = {
  trains: [],
  isLoading: false,
  error: '',
}
export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers:{
    trainsFetching(state){
      state.isLoading = true;
    },
    trainsFetchingSuccess(state, action: PayloadAction<ITrain[]>){
      state.isLoading = false;
      state.error = '';
      state.trains = action.payload;
    },
    trainsFetchingError(state, action: PayloadAction<string>){
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default trainSlice.reducer;