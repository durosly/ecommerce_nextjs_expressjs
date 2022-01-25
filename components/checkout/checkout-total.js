import { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import commaNumber from 'comma-number'
import CheckoutMissingItemModal from '../modals/checkout-missing-item-modal'

function CheckoutTotal({ state, addressChoice, subtotal, setSubtotal, isLoadingSubtotal, setIsLoadingSubtotal, deliveryFee, setDeliveryFee, isLoadingDeliveryFee, setIsLoadingDeliveryFee, isPayable, setIsPayable, cartItems }) {
    const { addToast } = useToasts()
    const [missingItemsIds, setMissingItemsIds] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        async function loadSubtotal() {
            try {
                setIsLoadingSubtotal(true)
                const response = await fetch("/user/cart/subtotal")
                const data = await response.json()
                
                const { status, message, subtotal } = data
                if(status === true) {
                    setSubtotal(subtotal)
                    setIsLoadingSubtotal(false)
                } else {
                    throw new Error(message)
                }
            } catch(error) {
                addToast("Something went wrong loading subtotal", { appearance: "error" })
                setIsLoadingSubtotal(false)
            }
        }
        loadSubtotal()
    }, [])

    useEffect(() => {

        async function makeNetworkRequest(state) {
            if(!state) return
            try {
                const response = await fetch(`/user/cart/delivery-fee/${ state }`)
                const data = await response.json()

                const { status, message, fees } = data

                
                if(status === true) {
                    if(cartItems.length > 0) {
                        if(cartItems.length === fees.length) {
                            console.log(fees, "fees")
                            const feesReducer = (prev, curr) => prev + curr.price
                            const feesTotal = fees.reduce(feesReducer, 0)
                            console.log(feesTotal)
                            setDeliveryFee(feesTotal)
                            setIsPayable(true)
                            setIsLoadingDeliveryFee(false)
                        } else {
                            // find product id that has no delivery fee
                            const productIds = fees.map(fee => fee.productId)

                            const missingItems = cartItems.filter(item => !productIds.includes(item.id))

                            setMissingItemsIds(missingItems)
                            
                            // set payable to false
                            setIsPayable(false)
                            setIsLoadingDeliveryFee(false)
                            // set show missing item(s) to true
                            setShowModal(true)
                        }
                    } else {
                        throw new Error("No items in your cart.")
                    }
                } else {
                    throw new Error(message)
                }
            } catch(error) {

                addToast(error.message, { appearance: "error" })

                setIsPayable(false)
                setIsLoadingDeliveryFee(false)
            }
        }

        async function loadDeliveryFee(){
            try {
                setIsLoadingDeliveryFee(true)

                if(addressChoice === 'new') {
                    makeNetworkRequest(state)
                } else if(addressChoice === 'profile') {
                    const response = await fetch("/user/profile/state")
                    const data = await response.json()
                    const { status, message, state: userState } = data
                    if(status === true) {
                        makeNetworkRequest(userState)
                    } else {
                        throw new Error(message)
                    }
                }
            } catch(error) {
                addToast(error.message, { appearance: "error" })
                setIsLoadingDeliveryFee(false)
            }

        }

        loadDeliveryFee()

    }, [addressChoice, state])

    return (
        <>
            <div className="checkout__total">
                <div className="checkout__subtotal">
                    <span className="checkout__subtotal--title">Subtotal</span>
                    <span className="checkout__subtotal--cost">{ isLoadingSubtotal ? <Loader type='TailSpin' height={16} width={16} /> : commaNumber(subtotal) }</span>
                </div>
                <div className="checkout__subtotal">
                    <span className="checkout__subtotal--title">Est. Delivery fee</span>
                    <span className="checkout__subtotal--cost">
                        { 
                            isLoadingDeliveryFee ? (
                                <Loader type='TailSpin' height={16} width={16} />
                            ) : (
                                deliveryFee === 0 ? "Free" : commaNumber(deliveryFee)
                            )
                        }
                    </span>
                </div>
                <hr />
                <div className="checkout__subtotal">
                    <span className="checkout__subtotal--title">Total</span>
                    <span className="checkout__subtotal--cost">{ commaNumber( subtotal + deliveryFee ) }</span>
                </div>
            </div>
            {
                showModal && <CheckoutMissingItemModal missingItemsIds={missingItemsIds} setShowModal={setShowModal} />
            }
           
        </>
    )
}

export default CheckoutTotal