import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import commaNumber from 'comma-number'
import { selectCartItems } from '../../features/cart/cartSlice'
import CheckoutMissingItemModal from '../modals/checkout-missing-item-modal'

function CheckoutTotal({ state, addressChoice, subtotal, setSubtotal, isLoadingSubtotal, setIsLoadingSubtotal, deliveryFee, setDeliveryFee, isLoadingDeliveryFee, setIsLoadingDeliveryFee, isPayable, setIsPayable }) {
    const { addToast } = useToasts()
    const cartItems = useSelector(selectCartItems)
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
                console.log(data)
                if(status === true) {
                    if(status === true) {
                        if(cartItems.length > 0) {
                            if(cartItems.length === fees.length) {
                                setIsPayable(true)
                                setIsLoadingDeliveryFee(false)
                            } else {
                                // find product id that has no delivery fee
                                console.log(fees, cartItems)

                                const productIds = fees.map(fee => fee.productId)

                                const missingItems = cartItems.filter(item => !productIds.includes(item.id))

                                setMissingItemsIds(missingItems)

                                setShowModal(true)
                                
                                // set payable to false
                                setIsPayable(false)
                                setIsLoadingDeliveryFee(false)
                                // set show missing item(s) to true
                            }
                        } else {
                            throw new Error("No items in your cart.")
                        }
                    } else {
                        throw new Error(message)
                    }
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
                    const { status, message, state } = data
                    if(status === true) {
                        makeNetworkRequest(state)
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
                    <span className="checkout__subtotal--cost">{ isLoadingDeliveryFee ? <Loader type='TailSpin' height={16} width={16} /> : commaNumber(deliveryFee)}</span>
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