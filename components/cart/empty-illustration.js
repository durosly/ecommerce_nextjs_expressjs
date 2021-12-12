import Image from 'next/image'
import illustration from '../../public/assets/images/illustrations/undraw_empty_cart_co35.svg'

function EmptyIllustration() {
    return (
        <div className="cart__illustration">
            <Image className="cart__illustration--image" src={illustration} layout="responsive" />
            <p className="cart__illustration--text">No item in cart</p>
        </div>
    )
}

export default EmptyIllustration