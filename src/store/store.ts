import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cardReducer from './reducers/TrainSlice'
import { trainAPI } from "../api/rtkqueryApi";


const rootReducer = combineReducers({
    cardReducer,
    [trainAPI.reducerPath]: trainAPI.reducer,
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trainAPI.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']