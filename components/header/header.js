import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserEmail } from '../../features/user/userSlice'
import { toggleMenu, selectMenuDisplay } from '../../features/menu/menuSlice'
import { toggleSearch, hideSearch, selectSearchDisplay } from '../../features/search/searchSlice'
import { selectNumberOfItemsInCart } from '../../features/cart/cartSlice'
import logo from "../../public/assets/images/logo/logo-top-transparent.png"
import Dropdown from './Dropdown'
import Search from './Search'

function Header() {
    // const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useDispatch()
    const menuDisplay = useSelector(selectMenuDisplay)
    const searchDisplay = useSelector(selectSearchDisplay)
    const userEmail = useSelector(selectUserEmail)
    const cartCount = useSelector(selectNumberOfItemsInCart)
    console.log(cartCount > 0)
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo-container">
                    <Image src={logo} alt="logo" className="header__logo" placeholder="blur" />
                </div>
                <Search mobile={false} />
                {
                    searchDisplay && (
                        <>
                            <Search mobile={true} />
                            <div className="header__dropdown--modal" onClick={() => dispatch(hideSearch())}></div>
                            <button className="header__dropdown--modal-close-btn" onClick={() => dispatch(hideSearch())}>
                                <i className="fas fa-reply"></i>
                                <span className="text">Return</span>
                            </button>
                        </>
                    )
                }
                <div className="header__icon-container">
                    <button className="header__icon header__icon--search" onClick={() => dispatch(toggleSearch())}>
                        <span className="icon">
                            <i className="fas fa-search"></i>
                        </span>
                    </button>
                    {
                        userEmail ? (
                            <Link href="/profile">
                                <a className="header__icon header__icon--login">
                                    <i className="fas fa-user-check"></i>
                                    <span>Profile</span>
                                </a>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <a className="header__icon header__icon--login">
                                    <i className="far fa-user"></i>
                                    <span>Login</span>
                                </a>
                            </Link>
                        )
                    }
                    <Link href="/cart">
                        <a className="header__icon header__icon--cart">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="sm-show">Cart</span>
                            {
                                cartCount > 0 && (
                                    <span className="header__icon--badge">
                                        { cartCount }
                                    </span>
                                )
                            }
                        </a>
                    </Link>
                    <button className="header__icon header__icon--menu" onClick={() => dispatch(toggleMenu())}>
                        <i className="fas fa-bars"></i>
                        <span className="sm-show">Menu</span>
                    </button>
                </div>
            </div>
            { 
                menuDisplay && (
                    <>
                        <Dropdown /> 
                        <div className="header__dropdown--modal"></div>
                    </>
                )
            }
        </header>
    )
}

export default Header