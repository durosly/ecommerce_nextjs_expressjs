import Image from 'next/image'
import Link from 'next/link'
import commaNumber from 'comma-number'

function ProductItem({ product }) {
    const { id, name, discount, price, image } = product 
    
    const currentPrice = price - (price * (discount / 100))

    async function addToCart(e) {
        e.preventDefault()
        console.log("added to cart")
    }
    
    return (
        <Link href={`/product/${id}`}>
            <a className="product-list__item">
                <span className="product-list__item-discount">-{ discount }%</span>
                <Image className="product-list__item-image" src={`/uploads/products/${image}`} alt={name} layout="responsive" height={300} width={200} />
                <div className="product-list__item-price">&#8358; { commaNumber(currentPrice) }</div>
                <div className="product-list__item-desc">
                    <h3 className="product-list__item-desc-name" title={ name.long }>{ name.short }</h3>
                    <span className="product-list__item-desc-price product-list__item-desc-price--prev">&#8358; { price }</span>
                    <span className="product-list__item-desc-price product-list__item-desc-price--curr">&#8358; { commaNumber(currentPrice) }</span>
                    <button className="product-list__item-cart-btn" onClick={addToCart} id={id}>
                        <span className="produt-list__item-cart-btn--text">Add to cart</span>
                        <i className="fas fa-cart-plus"></i>
                    </button>
                </div>
            </a>
        </Link>
    )
}

export default ProductItem
