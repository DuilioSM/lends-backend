import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiUrl } from "../api/ApiManager";

// Define a service using a base URL and expected endpoints
export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBusiness: builder.query({
      query: () => `business`,
    }),
  }),
});

export const { useGetBusinessQuery, useLazyGetBusinessQuery } = businessApi;
