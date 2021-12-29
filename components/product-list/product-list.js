import { useState, useEffect } from 'react'
import ProductItem from "./product-item"

function ProductList({ category }) {
    const { id, title } = category
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch(`/user/special-category/${ id }/products`)
                const data = await response.json()
                if(data.status === true) {
                    setProducts(data.products)
                }

            } catch(error) {

            }

        }
        getProducts()

    }, [])
    
    if(products.length < 1) return null

    return (
        <div className="product-list">
            <h2 className="product-list__title">{ title }</h2>
            <div className="product-list__container">
                {
                    products.slice(0, 6).map(product => <ProductItem key={product.id} product={product} />)
                }
                
            </div>
        </div>
    )
}

export default ProductList
