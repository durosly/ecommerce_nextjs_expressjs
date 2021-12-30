import commaNumber from 'comma-number'
import ProductDetailsAction from "./product-details-action"
import ProductDetailsImageDisplay from "./product-details-image"

function ProductDisplay({ product }) {
    const price = product.price - (product.price * product.discount / 100)
    
    return (
        <section className="product">
            <ProductDetailsImageDisplay product={product} />
            <div className="product-details-container">
                <h1 className="product__title">{ product.name }</h1>
                <p className="product__short-desc">{ product.desc }</p>
                <p className="product__price">&#8358; { commaNumber(price) }</p>
                <div className="product__review">
                    <div className="product__review--star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half"></i>
                    </div>
                    <span className="product__review--rate">4.5</span>
                    <span className="product__review--count">6.1K</span>
                </div>
                <ProductDetailsAction id={ product.id } />
            </div>
        </section>
    )
}

export default ProductDisplay