import { useState, useEffect } from 'react'
import Image from 'next/image'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import commaNumber from 'comma-number'

function OrderItem({ active, order, handleOrderSelection }) {
    const [productInfo, setProductInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { addToast } = useToasts()
    const { id, productId } = order

    useEffect(() => {
        async function loadProductInfo() {
            setIsLoading(true)
            try {
                const response = await fetch(`/user/order/${id}`)
                const data = await response.json()
                // console.log(data)

                const { status, message, order, base64 } = data

                if(status === true) {
                    setProductInfo({ ...order, base64 })
                    setIsLoading(false)
                } else {
                    throw new Error(message)
                }

            } catch(error) {
                setIsLoading(false)
                addToast(error.message, { appearance: "error" })
            }
        }

        loadProductInfo()
    }, [])
    console.log(productInfo)
    return (
        <li onClick={() => handleOrderSelection(order.id)} className={`order__list-item ${active && "order__list-item--active"}`}>
            {
                isLoading ? (
                    <>
                        <Loader type='TailSpin' color='#000' />
                        <span>Loading...</span>
                    
                    </>
                ) : (
                    <>
                    
                        <div className="order__list-item--image-container">
                            <Image 
                                className="order__list-item--image" 
                                src={`/uploads/products/${productInfo.productImage}`} 
                                layout='fill' 
                                alt="nike shoe"  
                                placeholder="blur"
                                blurDataURL={productInfo.base64}
                            />
                        </div>
                        <div className="order__list-item-title-count">
                            <h3 className="order__list-item--title">{ productInfo.productName }</h3>
                            <span className="order__list-item--count">({ productInfo.quantity }&times;)</span>
                        </div>
                        <div className="order__list-item-price-rate">
                            <p className="order__list-item--price">&#8358; { commaNumber(productInfo.price) }</p>
                            <span className="order__list-item--rate">
                                <i className="fas fa-star"></i>
                                4.5
                            </span>
                        </div>
                    </>
                )
            }
        </li>
    )
}

export default OrderItem