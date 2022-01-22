import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import commaNumber from 'comma-number'
import useToggleCartStatus from '../../hooks/useToggleCartStatus'

function CheckoutCartItem({ id }) {
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const { addToast } = useToasts()
    const { removeFromCart, isLoading: isCartLoading } = useToggleCartStatus(id)
    useEffect(() => {
        async function loadProduct() {
            setIsLoading(true)
            try {
                if(!id) return  
                const response = await fetch(`/user/product/${ id }`)
                const data = await response.json()

                if(data.status === true) {
                    setProduct(data.product)
                    setIsLoading(false)
                } else {
                    throw new Error()
                }

            } catch(error) {
                addToast("Failed to load product info", { appearance: "error" })
                setIsError(true)
                setIsLoading(false)
            }
        }

        loadProduct()
    }, [])

    return (
        <li className="cart__list-item">
            {
                isLoading ? (
                    <>
                        <Loader type='TailSpin' height={20} />
                        Loading...
                    </>
                ) : (
                    isError ? (
                        <p style={{ color: "red" }}>An error occured loading product information</p>
                    ) : (
                        <>
                            <div className="cart__list-img" style={{ overflow: "hidden"}}>
                                <Image src={`/uploads/products/${product.image}`} alt="" layout='intrinsic' width={150} height={200} />
                            </div>
                            <div className="cart__list-item-desc">
                                <h4 className="cart__list-item--title">{ product.name }</h4>
                                <div className="cart__list-item-qycl">
                                    <div className="cart__list-item--price">
                                        <span className="cart__list-item--price-label">Cost:</span>
                                        <span className="cart__list-item--price-display">&#8358; { commaNumber(product.price - ( product.price * product.discount / 100 )) }</span>
                                    </div>
                                    <div className="cart__list-item--quantity">
                                        <form onSubmit={ e => e.preventDefault() } action="/quatity" className="cart__list-item--quantity-form">
                                            <button disabled={isCartLoading} onClick={removeFromCart} className="cart__list-item-btn">
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )
            }
        </li>
    )
}

export default CheckoutCartItem