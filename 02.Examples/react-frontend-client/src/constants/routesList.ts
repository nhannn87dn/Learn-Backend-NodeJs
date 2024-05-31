import Home from '../pages/Home';
import Product from '../pages/Product';
import Customers from '../pages/Customers';
import CustomerProfile from '../pages/Customers/CustomerProfile';
import CustomerOrders from '../pages/Customers/CustomerOrders';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';
import EmptyLayout from '../components/Layouts/EmptyLayout';
import OnlyHeaderLayout from '../components/Layouts/OnlyHeaderLayout';
import ShoppingCart from '../pages/ShoppingCart';
import Checkout from '../pages/Checkout';


interface BaseProps {
    id: number;
    path: string;
    element: () => JSX.Element;
}
interface Routes extends  BaseProps {
    layout?: () => JSX.Element;
    nested?: BaseProps[]
}

//Public routes

const publicRoutes: Routes[] = [
    {id: 1, path: '/', element: Home},
    {id: 2, path: '/products', element: Product},
    {id: 3, path: '/products/:id', element: ProductDetails},
    {id: 5, path: '/login', element: Login, layout: EmptyLayout},
    {id: 6, path: '/customers', element: Customers, layout: OnlyHeaderLayout, nested: [
        {id: 1, path: '/customers/profile', element: CustomerProfile},
        {id: 2, path: '/customers/orders', element: CustomerOrders}
    ]},
    {id: 7, path: '/cart', element: ShoppingCart, layout: OnlyHeaderLayout},
    {id: 8, path: '/checkout', element: Checkout, layout: OnlyHeaderLayout},
]

//Private routes
const privateRoutes: Routes[] = [];

export {
    publicRoutes,
    privateRoutes
}
