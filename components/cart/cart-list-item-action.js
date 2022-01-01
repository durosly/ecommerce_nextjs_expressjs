import useToggleCartStatus from "../../hooks/useToggleCartStatus"

function CartListitemAction({ id }) {
    const { removeFromCart, increaseCartItemCount, decreaseCartItemCount, isLoading } = useToggleCartStatus(id)

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} action="/quatity" className="cart__list-item--quantity-form">
            <button disabled={isLoading} onClick={decreaseCartItemCount} className="cart__list-item-btn">
                <i className="fas fa-minus"></i>
            </button>
            <button disabled={isLoading} onClick={increaseCartItemCount} className="cart__list-item-btn">
                <i className="fas fa-plus"></i>
            </button>
            <button disabled={isLoading} onClick={removeFromCart} className="cart__list-item-btn">
                <i className="fas fa-trash-alt"></i>
            </button>
        </form>
    )
}

export default CartListitemAction