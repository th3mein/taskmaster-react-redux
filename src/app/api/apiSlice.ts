import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query";
import { setCredentials } from "../../features/auth/authSlice";
import type { RootState } from "../../app/store"; // Ensure you import your RootState type

const baseQuery = fetchBaseQuery({
  baseUrl: "https://taskmaster-api-8qyk.onrender.com/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Ensure correct typing

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the custom baseQuery with reauthentication
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("Sending refresh token");

    // Send refresh token request
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403 && refreshResult.error.data) {
        (refreshResult.error.data as { message?: string }).message =
          "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

// Create API slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: () => ({}),
});
