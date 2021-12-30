import { useRef, useEffect } from 'react'
import Link from "next/link"
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import Loader from 'react-loader-spinner'
import { hideMenu } from '../../features/menu/menuSlice'
import { selectUserEmail } from '../../features/user/userSlice'
const fetcher = url => fetch(url).then(res => res.json())

function Dropdown() {
    const dispatch = useDispatch()
    const userEmail = useSelector(selectUserEmail)
    const wrapperRef = useRef(null)

    const { data, error } = useSWR("/user/categories", fetcher)
    const { categories, status } = data || {}

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    dispatch(hideMenu())
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    useOutsideAlerter(wrapperRef)

    return (
        <div ref={wrapperRef} className="header__dropdown">
            <span className="header__dropdown--close-btn" onClick={() => dispatch(hideMenu())}>
                <i className="fas fa-times"></i>
            </span>
            <div className="header__dropdown-item">
                <h3 className="header__dropdown-item-title">Account</h3>
                <ul className="header__dropdown-list">
                    {
                        userEmail && (
                            <>
                                <li>
                                    <Link href="/profile">
                                        <a>Profile</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/orders">
                                        <a href="#">Orders</a>
                                    </Link>
                                </li>
                            </>
                        )
                    }

                    {
                        !userEmail && (
                            <>
                                <li>
                                    <Link href="/login">
                                        <a>Log in</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup">
                                        <a>sign up</a>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                    
                    <li>
                        <Link href="/cart">
                            <a>Cart</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact"> 
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/faq">
                            <a>FAQ</a>
                        </Link>
                    </li>
                    {
                        userEmail && (
                            <li>
                                <Link href="/logout">
                                    <a href="#">Log out</a>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className="header__dropdown-item header__dropdown-item--mobile">
                <h3 className="header__dropdown-item-title">Category</h3>
                <ul className="header__dropdown-list">
                    {
                        error ? (
                            <li>
                                <span style={{color: "red"}}>{ error.message }</span>
                            </li>
                        ) : (
                            data ? (
                                status ? (
                                    categories.length > 0 && categories.map(c => (
                                        <li key={c.id}>
                                            <Link href={`/category/${c.id}`}>
                                                <a className="category__list-item--link">{ c.name }</a>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <span style={{color: "red"}}>{ error.message }</span>
                                    </li>
                                )
                            ) : (
                                <li>
                                    <span>
                                        Loading...
                                        <Loader height={20} type="TailSpin" color="#000" />
                                    </span>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Dropdown
