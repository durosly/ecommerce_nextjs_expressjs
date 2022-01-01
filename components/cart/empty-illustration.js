import Image from 'next/image'
import illustration from '../../public/assets/images/illustrations/empty-cart.svg'

function EmptyIllustration() {
    return (
        <div className="cart__illustration">
            <Image className="cart__illustration--image" src={illustration} layout="responsive" />
            <p className="cart__illustration--text">No item in cart</p>
        </div>
    )
}

export default EmptyIllustration