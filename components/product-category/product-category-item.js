import Image from 'next/image'
import Link from 'next/link'
import commaNumber from 'comma-number'
import useToggleCartStatus from '../../hooks/useToggleCartStatus'

function ProductCategoryItem({ product }) {
    const { discount, image, price, id, name } = product
    const currPrice = price - (price * discount / 100)
    const { inCart, isLoading, handleCartSubmit } = useToggleCartStatus(id)
    
    return (
        <li className="product-category__list-item">
            <Link href={`/product/${id}`}>
                <a className="product-category__link">
                    <span className="product-category__link-discount">-{discount}%</span>
                    <Image className="product-category__link-image" src={`/uploads/products/${image}`} alt="nice" layout="responsive" height={100} width={100} />
                    <div className="product-category__link-price">&#8358; { commaNumber(currPrice)}</div>
                    <div className="product-category__link-desc">
                        <h3 className="product-category__link-desc-name" title={ name }>{ name }</h3>
                        <span className="product-category__link-desc-price product-category__link-desc-price--prev">&#8358; { commaNumber(price) }</span>
                        <span className="product-category__link-desc-price product-category__link-desc-price--curr">&#8358; { commaNumber(currPrice) }</span>
                        <button disabled={ isLoading } className="product-category__link-cart-btn" onClick={ handleCartSubmit } id={ id }>
                            {
                                isLoading ? (
                                    <span className="produt-list__link-cart-btn--text">Loading...</span>
                                ) : (
                                    inCart ? (
                                        <>
                                            <span className="produt-list__link-cart-btn--text">remove item</span>
                                            <i className="fas fa-cart-minus"></i>
                                        </>
                                    ) : (
                                        <>
                                            <span className="produt-list__link-cart-btn--text">Add to cart</span>
                                            <i className="fas fa-cart-plus"></i>
                                        </>
                                    )
                                )
                            }
                            
                        </button>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default ProductCategoryItem