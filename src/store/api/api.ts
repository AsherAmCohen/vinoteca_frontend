import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const vinotecaApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    tagTypes: ['wineList', 'markList', 'categoryList'],

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

        // Vinos
        StoreWine: builder.mutation({
            query: (data) => ({
                url: '/wine/StoreWine',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['wineList']
        }),

        Wines: builder.query({
            query: ({page, rowsPerPage}) => ({
                url: `/wine/wines?page=${page}&rowsPerPage=${rowsPerPage}`,
                method: 'GET',
            }),
            providesTags: ['wineList']
        }),

        // Marcas
        createMark: builder.mutation({
            query: (data) => ({
                url: '/mark/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['markList']
        }),

        searchMark: builder.query({
            query: (word: string) => ({
                url: `/mark/search?word=${word}`,
                method: 'GET'
            }),
            providesTags: ['markList']
        }),

        marks: builder.query({
            query: ({rowsPerPage, page}) => ({
                url: `mark/marks?rowsPerPage=${rowsPerPage}&page=${page}`,
                method: 'GET'
            }),
            providesTags: ['markList']
        }),

        // Categorias
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/category/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['categoryList']
        }),

        searchCategory: builder.query({
            query: (word: string) => ({
                url: `category/search?word=${word}`,
                method: 'POST'
            }),
            providesTags: ['categoryList']
        }),

        categorys: builder.query({
            query: ({rowsPerPage, page}) => ({
                url: `category/categorys?rowsPerPage=${rowsPerPage}&page=${page}`,
                method: 'GET'
            }),
            providesTags: ['categoryList']
        })
    })
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useUserInformationQuery,
    // Vinos
    useStoreWineMutation,
    useWinesQuery,
    // Marcas
    useCreateMarkMutation,
    useLazySearchMarkQuery,
    useMarksQuery,
    // Categorias
    useCreateCategoryMutation,
    useLazySearchCategoryQuery,
    useCategorysQuery
} = vinotecaApi