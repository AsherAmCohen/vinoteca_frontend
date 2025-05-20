import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const vinotecaApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl
    }),
    tagTypes: ['wineList', 'markList', 'categoryList', 'amountProduct'],

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

        AllUserRegister: builder.query({
            query: ({email, page, rowsPerPage}) => ({
                url: `/user/all?email=${email}&page=${page}&rowsPerPage=${rowsPerPage}`,
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

        allMarks: builder.query({
            query: () => ({
                url: `/mark/all`,
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

        allCategorys: builder.query({
            query: () => ({
                url: `category/all`,
                method: 'GET'
            }),
            providesTags: ['categoryList']
        }),

        categorys: builder.query({
            query: ({rowsPerPage, page}) => ({
                url: `category/categorys?rowsPerPage=${rowsPerPage}&page=${page}`,
                method: 'GET'
            }),
            providesTags: ['categoryList']
        }),

        // Carrito de compras
        amountProduct: builder.query({
            query: ({wineId, shoppingCartId}) => ({
                url: `/shoppingCart/product?wineId=${wineId}&shoppingCartId=${shoppingCartId}`,
                method: 'GET'
            }),
            providesTags: ['amountProduct']
        }),

        updateAmountProduct: builder.mutation({
            query: (data) => ({
                url: '/shoppingCart/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['amountProduct']
        }),

        countProducts: builder.query({
            query: ({shoppingCartId}) => ({
                url: `/shoppingCart/count?shoppingCartId=${shoppingCartId}`,
                method: 'GET'
            }),
            providesTags: ['amountProduct']
        })
    })
})

export const {
    // Usuarios
    useSignInMutation,
    useSignUpMutation,
    useUserInformationQuery,
    useAllUserRegisterQuery,
    // Vinos
    useStoreWineMutation,
    useWinesQuery,
    // Marcas
    useCreateMarkMutation,
    useAllMarksQuery,
    useMarksQuery,
    // Categorias
    useCreateCategoryMutation,
    useAllCategorysQuery,
    useCategorysQuery,
    // Carrito de compras
    useAmountProductQuery,
    useUpdateAmountProductMutation,
    useCountProductsQuery
} = vinotecaApi