import { useState, useEffect } from 'react'
import Head from 'next/head'
import config from 'config'
import { withIronSession } from 'next-iron-session'
import { useDispatch } from 'react-redux'
import UserLayout from '../components/userLayout'
import { setUser } from '../features/user/userSlice'

function Checkout({ user }) {
    const dispatch = useDispatch()
    const [paymentMethodChoice, setPaymentMethodChoice] = useState('others')
    const [addressChoice, setAddressChoice] = useState("profile")
    const [address, setAddress] = useState("")

    function handleChangePaymentMethod(e) {
        if(e.target.value === "wallet" || e.target.value === "others") {
            setPaymentMethodChoice(e.target.value)
        }
    }

    function handleAddressChoiceChange(e) {
        if(e.target.value === "profile" || e.target.value === "new") {
            setAddressChoice(e.target.value)
        }
    }

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })
    return (
        <UserLayout>
            <Head>
                <title>Safe plaze || payment checkout</title>
            </Head>
            <main className="container">
                <section className="checkout">
                    <h2 className="checkout__title">Checkout</h2>

                    <div className="checkout__info">
                        <div className="checkout__address">
                            <input onChange={handleAddressChoiceChange} checked={addressChoice === "profile"} id='profile-address' type="radio" value="profile" name="delivery-address" />
                            <label htmlFor="profile-address">Profile address</label>
                            <input onChange={handleAddressChoiceChange} checked={addressChoice === "new"} id='new-address' type="radio" value="new" name="delivery-address" />
                            <label htmlFor="new-address">New address</label>
                        </div>
                        {
                            addressChoice === "new" && (
                                <div className="checkout__address-input">
                                    <input type="text" name="address" id="address" placeholder='Enter full address' value={address} onChange={e => setAddress(e.target.value)} />
                                </div>
                            )
                        }
                    </div>

                    <div className="checkout__payment">
                        <p className="checkout__payment--title">Select payment method</p>
                        <form className="checkout__payment--list">
                            <input onChange={handleChangePaymentMethod} checked={paymentMethodChoice === "wallet"} type="radio" name="paymentMethod" id="payment-wallet" value="wallet" />
                            <label className="checkout__payment--list-item" htmlFor="payment-wallet">
                                <i className="fas fa-wallet"></i>
                                <div className="details">
                                    <h4 className="details__title">Wallet</h4>
                                    <p className="details__summary">Pay with balance from your safeplaze wallet</p>
                                </div>
                            </label>
                            <input onChange={handleChangePaymentMethod} checked={paymentMethodChoice === "others"} type="radio" name="paymentMethod" id="payment-others" value="others" />
                            <label htmlFor='payment-others' className="checkout__payment--list-item">
                                <i className="fas fa-university"></i>
                                <div className="details">
                                    <h4 className="details__title">Others</h4>
                                    <p className="details__summary">Card or bank transfer</p>
                                </div>
                            </label>
                        </form>
                    </div>

                    <div className="checkout__total">
                        <div className="checkout__subtotal">
                            <span className="checkout__subtotal--title">Subtotal</span>
                            <span className="checkout__subtotal--cost">3,000</span>
                        </div>
                        <div className="checkout__subtotal">
                            <span className="checkout__subtotal--title">Est. Delivery fee</span>
                            <span className="checkout__subtotal--cost">600</span>
                        </div>
                        <hr />
                        <div className="checkout__subtotal">
                            <span className="checkout__subtotal--title">Total</span>
                            <span className="checkout__subtotal--cost">3,600</span>
                        </div>
                    </div>

                    <form className="cart__cart-checkout-form" action="/proceed-to-payment">
                        <button className="cart__checkout-btn">
                            <i className="fas fa-cash-register"></i>
                            &nbsp;
                            Pay now
                        </button>
                    </form>

                    
                </section>
            </main>
           
            
        </UserLayout>
    )
}

export default Checkout

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
            redirect: {
                destination: '/',
                permanent: false,
            }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)