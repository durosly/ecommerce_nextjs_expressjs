import Image from 'next/image'
import Link from 'next/link'
import commaNumber from 'comma-number'

function ProductCategoryItem({ product }) {
    const { discount, image, price, id, name } = product
    const currPrice = price - (price * discount / 100)
    async function addToCart(e) {
        e.preventDefault()
        console.log("added to cart")
    }
    return (
        <li className="product-category__list-item">
            <Link href={`/product/${id}`}>
                <a className="product-category__link">
                    <span className="product-category__link-discount">-{discount}%</span>
                    <Image className="product-category__link-image" src={`/uploads/products/${image}`} alt="nice" layout="responsive" height={100} width={100} />
                    <div className="product-category__link-price">&#8358; { commaNumber(currPrice)}</div>
                    <div className="product-category__link-desc">
                        <h3 className="product-category__link-desc-name">{ name }</h3>
                        <span className="product-category__link-desc-price product-category__link-desc-price--prev">&#8358; { commaNumber(price) }</span>
                        <span className="product-category__link-desc-price product-category__link-desc-price--curr">&#8358; { commaNumber(currPrice) }</span>
                        <button className="product-category__link-cart-btn" onClick={addToCart} id={id}>
                            <span className="produt-list__link-cart-btn--text">Add to cart</span>
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default ProductCategoryItem