import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { selectCartItem, selectNumberOfItemsInCart, addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } from '../features/cart/cartSlice'
import { selectUserId } from '../features/user/userSlice'
import store from '../app/store'

function useToggleCartStatus(id) {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const isUnmounting = useRef(false)
    const [status, setStatus] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userId = useSelector(selectUserId)
    const item = selectCartItem(store.getState(), id)
    const numberOfItems = useSelector(selectNumberOfItemsInCart)

    useEffect(() => {
        if(userId) {
            setStatus(true)
        } else {
            setStatus(false)
        }

        return () => isUnmounting.current = true
    }, [userId])

    useEffect(() => {
        if(!isUnmounting) {
            const item = selectCartItem(store.getState(), id)
    
            if(item) {
                setInCart(true)
            } else {
                setInCart(false)
            }
        }
    }, [numberOfItems])

    useEffect(() => {
        if(item) {
            setInCart(true)
        } else {
            setInCart(false)
        }
    }, [item])

    async function addToCart() {

        if(status === true) {

            const response = await fetch("/user/cart/add", {
                method: "POST",
                body: JSON.stringify({ item: { id, quantity: 1}}),
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            const data = await response.json()
            if(data) {
                const { status: stat, productId, message } = data

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
        } else {
            dispatch(addItemToCart({ status, item: { id, quantity: 1 }}))
            setInCart(true)
            setIsLoading(false)
        }
    }

    async function removeFromCart() {
        try {

            if(status === true) {
    
                // set deleting status
                setIsDeleting(true)
                        
                // update cart for online users
                const response = await fetch(`/user/cart/${ id }`, {
                    method: "DELETE"
                })
    
                const data = await response.json()
                if(data) {
                    const { status: stat, message } = data
                    if(stat === true) {
                        dispatch(removeItemFromCart({ status, id }))
                        setInCart(false)
                        setIsLoading(false)
                        setIsDeleting(false)
                        setDeleteSuccess(true)
                    } else {
                        throw new Error(message)
                    }
                } else {
                    throw new Error("An error occured when trying to remove item from cart")
                }
            } else {
                // update cart for offline users
                dispatch(removeItemFromCart({ status, id }))
                setInCart(false)
                setIsLoading(false)
                setIsDeleting(false)
                setDeleteSuccess(true)
            }
        } catch(error) {
            setIsDeleting(false)
            addToast(error.message, { appearance: "error" })
        }

    }

    async function increaseCartItemCount() {
        setIsLoading(true)
        if(status === true) {

            try {
                const response = await fetch(`/user/cart/${ id }/increase`, {
                    method: "PUT"
                })
                const data = await response.json()
    
                if(data.status === true) {
                    dispatch(increaseItemQuantity({ id, status}))
                    setIsLoading(false)
                } else {
                    throw new Error(data.message)
                }
    
    
            } catch(error) {
                addToast(error.message, { appearance: "error"})
                setIsLoading(false)
            }

        } else {
            dispatch(increaseItemQuantity({ id, status}))
            setIsLoading(false)
        }
    }

    async function decreaseCartItemCount() {
        setIsLoading(true)
        if(status === true) {

            try {
                const response = await fetch(`/user/cart/${ id }/decrease`, {
                    method: "PUT"
                })
                const data = await response.json()
    
                if(data.status === true) {
                    dispatch(decreaseItemQuantity({ id, status}))
                    setIsLoading(false)
                } else {
                    throw new Error(data.message)
                }
    
    
            } catch(error) {
                addToast(error.message, { appearance: "error"})
                setIsLoading(false)
            }
        } else {
            dispatch(decreaseItemQuantity({ id, status}))
            setIsLoading(false)
        }
    }


    async function handleCartSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        try {

            if(inCart === true) {
               
                await removeFromCart()
                    
            } else {
                await addToCart()
            }
        } catch(error) {
            addToast(error.message, { appearance: "error"})
            setIsLoading(false)
        }

    }

    return { inCart, addToCart, removeFromCart, handleCartSubmit, increaseCartItemCount, decreaseCartItemCount, isLoading, isDeleting, deleteSuccess }
}

export default useToggleCartStatus