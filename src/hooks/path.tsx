import { NavLink } from "react-router-dom"
import Category from "../modules/Navbar/Category"
import Products from "../modules/Navbar/Products"
import Zakaz from "../modules/Navbar/Zakaz"
import Home from "../pages/Auth/Home"
import Site from "../modules/Navbar/Site"
import NotFound from "../modules/NotFound"

export const paths = {
    home: "/",
    login: "/login",
    category: "/category",
    products: "/products",
    zakaz: "/zakaz",
    site: "/site",
    notFound: "/*"
}

export const NavbarList = [
    {
        id: 1,
        path: paths.home,
        element: <Home/>
    },
    {
        id: 2,
        path: paths.category,
        element: <Category/>
    },
    {
        id: 3,
        path: paths.products,
        element: <Products/>
    },
    {
        id: 4,
        path: paths.zakaz,
        element: <Zakaz/>
    },
    {
        id: 5,
        path: paths.site,
        element: <Site/>
    },
    {
        id: 6,
        path: paths.notFound,
        element: <NotFound/>
    }
]

export const NavbarNavList = [
    {
        id: 1,
        label: <NavLink to={paths.products}>Продукты</NavLink>,
    },
    {
        id: 2,
        label: <NavLink to={paths.zakaz}>Заказы</NavLink>
    },
    {
        id: 3,
        label: <NavLink to={paths.category}>Категории</NavLink>,
    },
    {
        id: 4,
        label: <NavLink to={paths.site}>Сайт</NavLink>,
    },
]