import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { selectCartItem, addItemToCart, removeItemFromCart, selectNumberOfItemsInCart } from '../features/cart/cartSlice'
import { selectUserId } from '../features/user/userSlice'
import store from '../app/store'

function useToggleCartStatus(id) {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [status, setStatus] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userId = useSelector(selectUserId)
    const item = selectCartItem(store.getState(), id)

    useEffect(() => {
        if(userId) {
            setStatus(true)
        } else {
            setStatus(false)
        }
    }, [userId])

    useEffect(() => {
        if(item) {
            setInCart(true)
        } else {
            setInCart(false)
        }
    }, [item])

    async function addToCart() {
        try {
            const response = await fetch("/user/cart/add", {
                method: "POST",
                body: JSON.stringify({ item: { id, quantity: 1}}),
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            const data = await response.json()

            return data
        } catch(error) {
            return false
        }
    }

    async function removeFromCart() {
        try {
            const response = await fetch(`/user/cart/${ id }`, {
                method: "DELETE"
            })

            const data = await response.json()

            return data
        } catch(error) {
            return false
        }
    }


    async function handleCartSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        try {

            if(inCart === true) {
                const res = await removeFromCart()
                if(res) {
                    const { status: stat, message } = res
                    if(stat === true) {
                        dispatch(removeItemFromCart({ status, id }))
                        setInCart(false)
                        setIsLoading(false)
                    } else {
                        throw new Error(message)
                    }
                } else {
                    throw new Error("An error occured when trying to remove item from cart")
                }
            } else {
                const res = await addToCart()
                if(res) {
                    const { status: stat, productId, message } = res
    
                    if(stat === true) {
                        dispatch(addItemToCart({ status, item: { id: productId, quantity: 1 }}))
                        setInCart(true)
                        setIsLoading(false)
                    } else {
                        throw new Error(message)
                    }
                } else {
                    throw new Error("An error occured when trying to add item to cart")
                }
            }
        } catch(error) {
            addToast(error.message, { appearance: "error"})
            setIsLoading(false)
        }

    }

    return { inCart, addToCart, removeFromCart, handleCartSubmit, isLoading }
}

export default useToggleCartStatus