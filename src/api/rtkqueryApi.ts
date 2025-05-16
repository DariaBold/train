import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITrain } from "../types/interfaces";

export const trainAPI = createApi({
  reducerPath: "train",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json",
  }),
  endpoints: (builder) => ({
    getTrains: builder.query<ITrain[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetTrainsQuery } = trainAPI;
