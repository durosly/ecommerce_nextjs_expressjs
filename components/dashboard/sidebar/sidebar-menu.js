import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logo from '../../../public/assets/images/logo/logo-name-transparent.png'

function SidebarMenu() {
    const router = useRouter()
    return (
        <div className="sidebar-menu">
            <div className="sidebar-header">
                <div className="logo">
                    <Link href="/admin/dashboard">
                        <a>
                            <Image src={logo} placeholder="blur" alt="logo" />
                        </a>
                    </Link>
                </div>
            </div>
            <div className="main-menu">
                <div className="menu-inner">
                    <nav>
                        <ul className="metismenu" id="menu">
                            <li className={router.pathname === "/admin/dashboard" ? "active" : ''}>
                                <Link href="/admin/dashboard">
                                    <a>
                                        <i className="ti-dashboard"></i>
                                        <span>dashboard</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/vendors" ? "active" : ''}>
                                <Link href="/admin/vendors">
                                    <a>
                                        <i className="ti-pulse"></i>
                                        <span>Vendors</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/users" ? "active" : ''}>
                                <Link href="/admin/users">
                                    <a>
                                        <i className="ti-user"></i>
                                        <span>Users</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/orders" ? "active" : ''}>
                                <Link href="/admin/orders">
                                    <a>
                                        <i className="ti-agenda"></i>
                                        <span>Orders</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/categories" ? "active" : ''}>
                                <Link href="/admin/categories">
                                    <a>
                                        <i className="ti-layers-alt"></i>
                                        <span>Categories</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/products" ? "active" : ''}>
                                <Link href="/admin/products">
                                    <a>
                                        <i className="ti-package"></i>
                                        <span>Products</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/transactions" ? "active" : ''}>
                                <Link href="/admin/transactions">
                                    <a>
                                        <i className="ti-money"></i>
                                        <span>Transactions</span>
                                    </a>
                                </Link>
                            </li>
                            <li className={router.pathname === "/admin/profiles" ? "active" : ''}>
                                <Link href="/admin/profiles">
                                    <a>
                                        <i className="ti-user"></i>
                                        <span>Admins</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SidebarMenu