export const navItem = [
    {
        key: 'orders',
        title: 'Pedidos',
        href: '/user/orders',
        icon: 'orders',
        permissions: ['VIEW_ORDER']
    },
    {
        key: 'information',
        title: 'Información personal',
        href: '/user',
        icon: 'information',
        permissions: ['VIEW_PROFILE']
    },
    {
        key: 'winelist',
        title: 'Carta de vinos',
        href: '/user/wine',
        icon: 'winelist',
        permissions: ['VIEW_WINE']
    },
    {
        key: 'mark',
        title: 'Marcas',
        href: '/user/wine/mark',
        icon: 'mark',
        permissions: ['VIEW_MARK']
    },
    {
        key: 'category',
        title: 'Categorias',
        href: '/user/wine/category',
        icon: 'category',
        permissions: ['VIEW_CATEGORY']
    },
    {
        key: 'users',
        title: 'Usuarios',
        href: '/user/users',
        icon: 'user',
        permissions: ['VIEW_USER']
    }
]