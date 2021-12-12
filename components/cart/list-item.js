

function ListItem() {
    return (
        <li className="cart__list-item">
            <img src="assets/images/products/bags/arno-senoner-ZT16YkAYueo-unsplash.jpg" alt="" className="cart__list-img" />
            <div className="cart__list-item-desc">
                <h4 className="cart__list-item--title">Premium leather bag</h4>
                <div className="cart__list-item-qycl">
                    <div className="cart__list-item--size">
                        <span className="cart__list-item--size-label">Size:</span>
                        <span className="cart__list-item--size-display">XL</span>
                    </div>
                    <div className="cart__list-item--colour">
                        <span className="cart__list-item--colour-label">colour: </span>
                        <span className="cart__list-item--colour-display" style={{backgroundColor: "brown"}}>&nbsp;</span>
                    </div>
                    <div className="cart__list-item--price">
                        <span className="cart__list-item--price-label">Cost:</span>
                        <span className="cart__list-item--price-display">&#8358; 3,000</span>
                    </div>
                    <div className="cart__list-item--quantity">
                        <span className="cart__list-item--quantity-label">Quatity: </span>
                        <span className="cart__list-item--quantity-display">1</span>
                        <form action="/quatity" className="cart__list-item--quantity-form">
                            <button className="cart__list-item-btn">
                                <i className="fas fa-minus"></i>
                            </button>
                            <button className="cart__list-item-btn">
                                <i className="fas fa-plus"></i>
                            </button>
                            <button className="cart__list-item-btn">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ListItem