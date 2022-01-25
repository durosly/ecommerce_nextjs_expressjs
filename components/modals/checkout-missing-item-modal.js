import CheckoutCartItem from './checkout-cart-item'

function CheckoutMissingItemModal({ setShowModal, missingItemsIds }) {
    
    return (
        <div className="modal">
            <div className="modal__card">
                <button className="modal__close-btn" onClick={() => setShowModal(false)}>&times;</button>
                <div className="modal__cart-item-container">
                    <div className="modal__notice modal__notice--info">
                        Delivery fee not set for selected location. <br />Remove item from cart or choice a different location
                    </div>
                    <ul className="cart__list cart__list--checkout-modal">
                        {
                            missingItemsIds.map(item => <CheckoutCartItem key={item.id} id={item.id} />)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CheckoutMissingItemModal