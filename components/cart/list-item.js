import { useState, useEffect } from 'react'
import Image from 'next/image'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import commmaNumber from 'comma-number'
import CartListitemAction from './cart-list-item-action'

function ListItem( { item, setPrices, prices }) {
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [product, setProduct] = useState({})
    const { quantity } = item

    useEffect(() => {
        async function loadProduct() {
            setIsLoading(true)
            try {
                if(!item.id) return  
                const response = await fetch(`/user/product/${ item.id }`)
                const data = await response.json()

                if(data.status === true) {
                    const price = data.product.price - (data.product.price * data.product.discount / 100)
                    //const cost = price * item.quantity

                    setPrices(curr => [...new Set([...curr, { id: item.id, price, quantity: item.quantity }]) ])
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

    useEffect(() => {
        //const price = product.price - (product.price * product.discount / 100)
        
        const index = prices.findIndex(item => item.id === product.id)

        if(index > -1) {
            const newPrices = [...prices]
            newPrices[index].quantity = item.quantity
            setPrices(newPrices)
        }
    }, [quantity])

    useEffect(() => {

        return () => {
            const newPrices = prices.filter(item => item.id !== product.id)

            setPrices(newPrices)
        }
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
                                <Image src={`/uploads/products/${ product.image }`} alt="" layout='intrinsic' width={150} height={200} />
                            </div>
                            <div className="cart__list-item-desc">
                                <h4 className="cart__list-item--title">{ product.name }</h4>
                                <div className="cart__list-item-qycl">
                                    {/* <div className="cart__list-item--size">
                                        <span className="cart__list-item--size-label">Size:</span>
                                        <span className="cart__list-item--size-display">XL</span>
                                    </div>
                                    <div className="cart__list-item--colour">
                                        <span className="cart__list-item--colour-label">colour: </span>
                                        <span className="cart__list-item--colour-display" style={{backgroundColor: "brown"}}>&nbsp;</span>
                                    </div> */}
                                    <div className="cart__list-item--price">
                                        <span className="cart__list-item--price-label">Cost:</span>
                                        <span className="cart__list-item--price-display">&#8358; { commmaNumber( product.price - (product.price * product.discount / 100) )}</span>
                                    </div>
                                    <div className="cart__list-item--quantity">
                                        <span className="cart__list-item--quantity-label">Quatity: </span>
                                        <span className="cart__list-item--quantity-display">{ item.quantity }</span>
                                        <CartListitemAction id={ item.id } />
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

export default ListItem