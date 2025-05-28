import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const vinotecaApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl,
        prepareHeaders: (headers, {}) => {
            const token = localStorage.getItem('token')
            const apiKey = import.meta.env.VITE_INTERNAL_API_KEY

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            if (apiKey) {
                headers.set('x-internal-api-key', apiKey)
            }

            return headers
        }
    }),
    tagTypes: ['userInfo', 'userList', 'roleList', 'wineList', 'markList', 'categoryList', 'amountProduct'],

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
            }),
            invalidatesTags: ['userList']
        }),

        UserInformation: builder.query({
            query: (email: string) => ({
                url: `/user/Information?email=${email}`,
                method: 'GET'
            }),
            providesTags: ['userInfo']
        }),

        Users: builder.query({
            query: ({ email, page, rowsPerPage }) => ({
                url: `/user/users?email=${email}&page=${page}&rowsPerPage=${rowsPerPage}`,
                method: 'GET'
            }),
            providesTags: ['userList']
        }),

        updateUserRole: builder.mutation({
            query: (data) => ({
                url: `/user/update/role`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['userList']
        }),

        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/user/delete`,
                method: 'DELETE',
                body: data
            }),
            invalidatesTags: ['userList']
        }),

        verifyUser: builder.mutation({
            query: (data) => ({
                url: '/user/verify',
                method: 'PUT',
                body: data
            })
        }),

        changePassword: builder.mutation({
            query: (data) => ({
                url: '/user/password',
                method: 'PUT',
                body: data
            })
        }),

        changeData: builder.mutation({
            query: (data) => ({
                url: '/user/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['userInfo']
        }),

        // Roles y permisos
        Roles: builder.query({
            query: ({ page, rowsPerPage }) => ({
                url: `/role/roles?page=${page}&rowsPerPage=${rowsPerPage}`,
                method: 'GET'
            }),
            providesTags: ['roleList']
        }),

        Permissions: builder.query({
            query: () => ({
                url: '/role/permissions',
                method: 'GET'
            })
        }),

        CreateRole: builder.mutation({
            query: (data) => ({
                url: '/role/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['roleList']
        }),

        UpdateRole: builder.mutation({
            query: (data) => ({
                url: '/role/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['roleList']
        }),

        allRoles: builder.query({
            query: () => ({
                url: '/role/all',
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
            query: ({ page, rowsPerPage }) => ({
                url: `/wine/wines?page=${page}&rowsPerPage=${rowsPerPage}`,
                method: 'GET',
            }),
            providesTags: ['wineList']
        }),

        WinesInStock: builder.query({
            query: ({page, rowsPerPage}) => ({
                url: `/wine/inStock?page=${page}&rowsPerPage=${rowsPerPage}`,
                method: 'GET'
            }),
            providesTags: ['wineList']
        }),

        UpdateWine: builder.mutation({
            query: (data) => ({
                url: '/wine/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['wineList']
        }),

        InfoWine: builder.query({
            query: ({id, amount}) => ({
                url: `wine/wine?id=${id}&amount=${amount}`,
                method: 'GET'
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
            query: ({ rowsPerPage, page }) => ({
                url: `mark/marks?rowsPerPage=${rowsPerPage}&page=${page}`,
                method: 'GET'
            }),
            providesTags: ['markList']
        }),

        updateMark: builder.mutation({
            query: (data) => ({
                url: '/mark/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['markList']
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
                url: `/category/all`,
                method: 'GET'
            }),
            providesTags: ['categoryList']
        }),

        categorys: builder.query({
            query: ({ rowsPerPage, page }) => ({
                url: `/category/categorys?rowsPerPage=${rowsPerPage}&page=${page}`,
                method: 'GET'
            }),
            providesTags: ['categoryList']
        }),

        updateCategory: builder.mutation({
            query: (data) => ({
                url: '/category/update',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['categoryList']
        }),

        // Carrito de compras
        amountProduct: builder.query({
            query: ({ wineId, shoppingCartId }) => ({
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
            query: ({ shoppingCartId }) => ({
                url: `/shoppingCart/count?shoppingCartId=${shoppingCartId}`,
                method: 'GET'
            }),
            providesTags: ['amountProduct']
        }),

        winesShoppingCart: builder.query({
            query: ({shoppingCartId}) => ({
                url: `/shoppingCart/wines?shoppingCartId=${shoppingCartId}`,
                method: 'GET'
            }),
            providesTags: ['amountProduct']
        }),

        paymentShoppingCart: builder.mutation({
            query: (data) => ({
                url: '/shoppingCart/payment',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['wineList']
        }),

        shoppingPayment: builder.query({
            query: ({email, page, rowsPerPage}) => ({
                url: `/shoppingCart/shopping?email=${email}&page=${page}&rowsPerPage=${rowsPerPage}`,
                method: 'GET'
            }),
        }),

        shoppingCartUser: builder.query({
            query: ({email}) => ({
                url: `/shoppingCart/user?email=${email}`,
                method: 'GET'
            })
        })
    })
})

export const {
    // Usuarios
    useSignInMutation,
    useSignUpMutation,
    useUserInformationQuery,
    useUsersQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,
    useVerifyUserMutation,
    useChangePasswordMutation,
    useChangeDataMutation,
    // Roles y Permisos
    useRolesQuery,
    usePermissionsQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useAllRolesQuery,
    // Vinos
    useStoreWineMutation,
    useWinesQuery,
    useUpdateWineMutation,
    useInfoWineQuery,
    useWinesInStockQuery,
    // Marcas
    useCreateMarkMutation,
    useAllMarksQuery,
    useMarksQuery,
    useUpdateMarkMutation,
    // Categorias
    useCreateCategoryMutation,
    useAllCategorysQuery,
    useCategorysQuery,
    useUpdateCategoryMutation,
    // Carrito de compras
    useAmountProductQuery,
    useUpdateAmountProductMutation,
    useCountProductsQuery,
    useWinesShoppingCartQuery,
    usePaymentShoppingCartMutation,
    useShoppingPaymentQuery,
    useLazyShoppingCartUserQuery
} = vinotecaApi