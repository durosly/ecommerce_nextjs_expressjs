import Image from 'next/image'

function ProductItem({ product }) {
    const { id, name, discount, price, image } = product
    return (
        <a href="#some-product" className="product-list__item">
            <span className="product-list__item-discount">-{discount}%</span>
            <Image className="product-list__item-image" src={image} alt={name} layout="responsive" height={300} width={200} />
            <div className="product-list__item-price">&#8358; {price.curr}</div>
            <div className="product-list__item-desc">
                <h3 className="product-list__item-desc-name" title={name.long}>{name.short}</h3>
                <span className="product-list__item-desc-price product-list__item-desc-price--prev">&#8358; {price.prev}</span>
                <span className="product-list__item-desc-price product-list__item-desc-price--curr">&#8358; {price.curr}</span>
                <button className="product-list__item-cart-btn" id={id}>
                    <span className="produt-list__item-cart-btn--text">Add to cart</span>
                    <i className="fas fa-cart-plus"></i>
                </button>
            </div>
        </a>
    )
}

export default ProductItem
