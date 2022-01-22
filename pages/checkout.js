import { useState, useEffect } from 'react'
import Head from 'next/head'
import config from 'config'
import { withIronSession } from 'next-iron-session'
import { useDispatch } from 'react-redux'
import { usePaystackPayment } from 'react-paystack'
import { useToasts } from 'react-toast-notifications'
import UserLayout from '../components/userLayout'
import { setUser } from '../features/user/userSlice'
import NewAddress from '../components/checkout/new-address'
import CheckoutTotal from '../components/checkout/checkout-total'

function Checkout({ user }) {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [paymentMethodChoice, setPaymentMethodChoice] = useState('others')
    const [addressChoice, setAddressChoice] = useState("profile")
    const [address, setAddress] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [subtotal, setSubtotal] = useState(0)
    const [isLoadingSubtotal, setIsLoadingSubtotal] = useState(false)
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [isLoadingDeliveryFee, setIsLoadingDeliveryFee] = useState(false)
    const [isPayable, setIsPayable] = useState(true)

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

    // paystack config object
    const paystackConfig = {
        reference: `${user.id}_safeplaze_${Date.now()}`,
        email: user.email,
        amount: 40000,
        publicKey: 'pk_test_1595d971481e77bb7ac48baa7b9b6d8c8730c70f'
    }

    const onSuccess = reference => {
        console.log("...success...")
        console.log(reference)
    }

    const onClose = () => {
        addToast("Transaction did not complete", { appearance: "warning" })
        console.log("...closed...")
    }
    
    const initializePayment = usePaystackPayment(paystackConfig)

    // end paystack config

    function handlePayment() {
        if(paymentMethodChoice === 'wallet') {
            addToast("Wallet coming soon...", { appearance: "info" })
        } else {
            initializePayment(onSuccess, onClose)
        }
    }



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
                                <NewAddress 
                                    address={address} 
                                    setAddress={setAddress} 
                                    state={state}
                                    setState={setState}
                                    city={city}
                                    setCity={setCity}
                                />
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

                    <CheckoutTotal
                        state={state}
                        addressChoice={addressChoice}
                        subtotal={subtotal}
                        setSubtotal={setSubtotal}
                        isLoadingSubtotal={isLoadingSubtotal}
                        setIsLoadingSubtotal={setIsLoadingSubtotal}
                        deliveryFee={deliveryFee}
                        isLoadingDeliveryFee={isLoadingDeliveryFee}
                        setDeliveryFee={setDeliveryFee}
                        setIsLoadingDeliveryFee={setIsLoadingDeliveryFee}
                        isPayable={isPayable}
                        setIsPayable={setIsPayable}
                    />

                    <form onSubmit={e => e.preventDefault()} className="cart__cart-checkout-form" action="/proceed-to-payment">
                        <button onClick={handlePayment} className="cart__checkout-btn">
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