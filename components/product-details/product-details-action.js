import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { selectCartItem, addItemToCart, removeItemFromCart } from '../../features/cart/cartSlice'
import { selectUserId } from '../../features/user/userSlice'
import store from '../../app/store'

function ProductDetailsAction({ id }) {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const { addToast } = useToasts()
    const [inCart, setInCart] = useState(false)
    const item = selectCartItem(store.getState(), id)

    useEffect(() => {
        if(item) {
            setInCart(true)
        } else {
            setInCart(false)
        }
    })

    async function handleSubmit(e) {
        e.preventDefault()

        if(inCart) {
            dispatch(removeItemFromCart(id))
            setInCart(false)
        } else {
            dispatch(addItemToCart({ id, quantity: 1 }))
            setInCart(true)
        }
    }
    return (
        <form disabled={inCart} onSubmit={handleSubmit} className="product-action">
            {/* <div className="product-variety">
                <h3 className="product-variety__title">Colour</h3>
                <div className="product-variety__list">
                    <input className="product-variety__list--choice-radio" type="radio" name="colour" id="red" />
                    <label className="product-variety__list--choice" for="red" style={{backgroundColor: "#202B4B"}}></label>
                    <input className="product-variety__list--choice-radio" type="radio" name="colour" id="blue" />
                    <label className="product-variety__list--choice" for="blue"></label>
                    <input className="product-variety__list--choice-radio" type="radio" name="colour" id="green" />
                  <label className="product-variety__list--choice" for="green" style={{backgroundColor: "#6D5043"}}></label>
                </div>
            </div>
            <div className="product-variety">
                <h3 className="product-variety__title">Size</h3>
                <div className="product-variety__list">
                    <input className="product-variety__list--choice-radio" type="radio" name="size" id="size-1" />
                    <label className="product-variety__list--choice" for="size-1" >1X</label>
                    <input className="product-variety__list--choice-radio" type="radio" name="size" id="size-2" />
                    <label className="product-variety__list--choice" for="size-2">2X</label>
                    <input className="product-variety__list--choice-radio" type="radio" name="size" id="size-3" />
                    <label className="product-variety__list--choice" for="size-3">3X</label>
                </div>
            </div> */}
            <button className="product-action__btn--cart" type="submit">
                {
                    inCart ? (
                        <>
                            <i className="fas fa-trash"></i>
                            &nbsp;
                            Remove
                        </>
                    ) : (
                        <>
                            <i className="fas fa-cart-plus"></i>
                            &nbsp;
                            Add
                        </>
                    )
                }
            </button>
        </form>
    )
}

export default ProductDetailsAction