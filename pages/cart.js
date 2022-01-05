import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import config from 'config'
import { withIronSession } from 'next-iron-session'
import commaNumber from 'comma-number'
import UserLayout from "../components/userLayout"
import EmptyIllustration from '../components/cart/empty-illustration'
import ListItem from '../components/cart/list-item'
import CartCheckoutAction from '../components/cart/cart-checkout-action'
import { setUser } from '../features/user/userSlice'
import { selectCartItems } from '../features/cart/cartSlice'

function Cart({ user }) {
    const dispatch = useDispatch()
    const [subTotal, setSubTotal] = useState(0)
    const [prices, setPrices] = useState([])
    const items = useSelector(selectCartItems)

    console.log(items)

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })

    useEffect(() => {
        if(prices.length > 0) {
            const reducer = (prev, curr) => prev + ( curr.price * curr.quantity )
            const total = prices.reduce(reducer, 0)

            setSubTotal(total)
        }

        console.log(subTotal)
    }, [prices])

    return (
        <UserLayout>
            <Head>
                <title>Safe plaze || cart</title>
            </Head>
            <div className="container">
                <section className="cart">
                    <h2 className="cart__title">Cart</h2>

                    {
                        items && items.length > 0 ? (
                            <>
                                <ul className="cart__list">
                                    {
                                        items.map((item, i) => <ListItem key={item.id || i} item={item} prices={prices} setPrices={setPrices} />)
                                    }
                                </ul>
                                <hr />
                                <div className="cart__sub-action">
                                    <p className="cart__sub-total">
                                        <span className="cart__sub-total--label">Sub total: </span>
                                        <span className="cart__sub-total--value">&#8358; { commaNumber(subTotal)}</span>
                                    </p>
                                    <CartCheckoutAction />
                                </div>
                            </>
                        ) : (
                            <EmptyIllustration />
                        )
                    }

                </section>
            </div>
            
        </UserLayout>
    )
}

export default Cart

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user")

        if(user) {
            return {
                props: {
                    user
                }
            }
        }

        return {
            props: { }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)