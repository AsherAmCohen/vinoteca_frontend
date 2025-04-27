import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const vinotecaApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    tagTypes: ['wineList'],

    endpoints: (builder) => ({
        // Manejo de usuarios
        SignIn: builder.mutation({
            query: (data) => ({
                url: '/user/SignIn',
                method: 'POST',
                body: data
            })
        }),

        SignUp: builder.mutation({
            query: (data) => ({
                url: '/user/SignUp',
                method: 'POST',
                body: data
            })
        }),

        UserInformation: builder.query({
            query: (email: string) => ({
                url: `/user/Information?email=${email}`,
                method: 'GET'
            })
        }),

        // Vinoes
        StoreWine: builder.mutation({
            query: (data) => ({
                url: '/wine/StoreWine',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['wineList']
        }),

        Wines: builder.query({
            query: () => ({
                url: '/wine/wines',
                method: 'GET',
            }),
            providesTags: ['wineList']
        })
    })
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useUserInformationQuery,
    // Vinos
    useStoreWineMutation,
    useWinesQuery
} = vinotecaApi