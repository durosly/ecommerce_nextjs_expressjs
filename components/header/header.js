import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { selectUserEmail } from '../../features/user/userSlice'
import { toggleMenu, selectMenuDisplay } from '../../features/menu/menuSlice'
import { toggleSearch, hideSearch, selectSearchDisplay } from '../../features/search/searchSlice'
import { selectNumberOfItemsInCart, setUpCart, LOCAL_STRORAGE_NAME } from '../../features/cart/cartSlice'
import logo from "../../public/assets/images/logo/logo-top-transparent.png"
import Dropdown from './Dropdown'
import Search from './Search'

function Header() {
    // const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const menuDisplay = useSelector(selectMenuDisplay)
    const searchDisplay = useSelector(selectSearchDisplay)
    const userEmail = useSelector(selectUserEmail)
    const cartCount = useSelector(selectNumberOfItemsInCart)

    // load cart from local storage to db if user is logged in
    useEffect(() => {
        async function loadToDB() {
            try {

                const localDB = JSON.parse(window.localStorage.getItem(LOCAL_STRORAGE_NAME))
                if( localDB && localDB.numberOfItems > 0) {
    
                    const response = await fetch("/user/cart/offline", {
                        method: 'POST',
                        body: JSON.stringify({ db: localDB }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                    const data = await response.json()
                    const { status, message } = data

                    if(status === true) {
                        addToast("Offline cart moved online", { appearance: "success" })
                        window.localStorage.removeItem(LOCAL_STRORAGE_NAME)
                    } else {
                        throw new Error(message)
                    }
                }
            } catch(error) {
                console.log(error)
            }
        }

        // fire function is 
    
        if(userEmail) loadToDB()

    }, [userEmail])

    // lood cart from db if user is logged in
    useEffect(() => {
        async function getUserCart() {

            if(userEmail) {
                try {
                    const response = await fetch("/user/cart")
    
                    const data = await response.json()
    
                    const { status, message, cartItems } = data
    
                    if(status === true) {
                        dispatch(setUpCart(cartItems))
                    } else {
                        throw new Error(message)
                    }
    
                } catch(error) {
                    addToast(error.message, { appearance: "error" })
                }
            }
        }

        getUserCart()
    }, [userEmail])
    
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
                                    <span id="profile" className="header__icon-text">Profile</span>
                                </a>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <a className="header__icon header__icon--login">
                                    <i className="far fa-user"></i>
                                    <span id="login" className="header__icon-text">Login</span>
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
