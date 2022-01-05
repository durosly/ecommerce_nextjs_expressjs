import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../features/user/userSlice'

function CartCheckoutAction() {
    const userId = useSelector(selectUserId)
    const router = useRouter()

    function handleSubmit(e) {
        e.preventDefault()

        if(userId) {
            router.push("/checkout")
        } else {
            localStorage.setItem("SAFE_PLAZE_CALLBACK", "checkout")
            router.push("/login")
        }
    }
    return (
        <form onSubmit={handleSubmit} className="cart__cart-checkout-form" action="/proceed-to-checkout">
            <button className="cart__checkout-btn">
                <i className="fas fa-luggage-cart"></i>
                &nbsp;
                checkout
            </button>
        </form>
    )
}

export default CartCheckoutAction