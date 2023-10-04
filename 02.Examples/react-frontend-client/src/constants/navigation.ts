export const navigation = [
    {id: 1, name: 'Home', link: '/'},
    {id: 3, name: 'Category', link: '/category'},
    {id: 4, name: 'Product', link: '/product'},
    {id: 5, name: 'Login', link: '/login'},
    {id: 6, name: 'Customers', link: '/customers', childs: [
        {id: 1, name: 'Orders', link: '/customers/orders'},
        {id: 2, name: 'Profile', link: '/customers/profile'},
    ]},
]