import { getToken } from "@/utils/getToken";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACK_END_URL,
    prepareHeaders: (header) => {
      if (getToken()) header.set("Authorization", getToken() as string);
    },
  }),
  tagTypes: ["aUserData","aUserFollowing"],
  endpoints: (builder) => {
    return {
      signup: builder.mutation({
        query: (payload) => {
          console.log(payload);
          return {
            url: "/auth/signup",
            method: "POST",
            body: payload,
          };
        },
      }),
      login: builder.mutation({
        query: (payload) => {
          console.log(payload);
          return {
            url: "/auth/login",
            method: "POST",
            body: payload,
          };
        },
      }),

      checkCredentials: builder.mutation({
        query: (payload) => {
          return {
            url: "/auth/checkCredentials",
            method: "POST",
            body: payload,
          };
        },
      }),
      changePassword: builder.mutation({
        query: (payload) => {
          return {
            url: "/auth/changePassword",
            method: "POST",
            body: payload,
          };
        },
      }),

      UpdateAUser: builder.mutation({
        query: (payload) => {
          const { id, ...rest } = payload;
          return {
            url: `/auth/${id}`,
            method: "PUT",
            body: rest,
          };
        },
        invalidatesTags: ["aUserData"],
      }),

      getLoggedInUser: builder.query({
        query: () => {
          return {
            url: `/auth/getCurrentUser`,
            method: "GET",
          };
        },
        providesTags: ["aUserData"],
      }),

      getAUser: builder.query({
        query: (payload) => {
          console.log(payload, "user payload");
          return {
            url: `/auth/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["aUserData"],
      }),

      getFollowerAndFollowing: builder.query({
        query: (payload) => {
          return {
            url: `/follow/${payload}`,
            method: "GET",
          };
        },
        providesTags: ["aUserFollowing"],
      }),

      createFollowing: builder.mutation({
        query: (payload) => {
          return {
            url: "/follow",
            method: "POST",
            body: payload,
          };
        },
      }),

      getPaymentUrl: builder.query({
        query: (payload) => {
          return {
            url: `/pay/${payload}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetLoggedInUserQuery,
  useGetPaymentUrlQuery,
  useChangePasswordMutation,
  useCheckCredentialsMutation,
  useGetAUserQuery,
  useUpdateAUserMutation,
  useGetFollowerAndFollowingQuery,
  useCreateFollowingMutation
} = baseApi;
