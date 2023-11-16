import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "@/helpers/interfaces";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUser: builder.query<IUser, string>({
      query: (email: string) => `/users/${email}`,
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;

