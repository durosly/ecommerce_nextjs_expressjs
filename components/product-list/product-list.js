import ProductItem from "./product-item"

function ProductList() {
    const products = [
        {
            id: 1,
            name: {
                short: "Premium nike shoe",
                long: "Premium nike SD-2020 limited edition shoe"
            },
            discount: 2,
            price: {
                curr: 9000,
                prev: 10000
            },
            image: "/assets/images/products/bags/adejoke-drilling-XBqD7PZp5mQ-unsplash.jpg"
        },
        {
            id: 2,
            name: {
                short: "Premium nike shoe",
                long: "Premium nike SD-2020 limited edition shoe"
            },
            discount: 2,
            price: {
                curr: 9000,
                prev: 10000
            },
            image: "/assets/images/products/bags/adejoke-drilling-XBqD7PZp5mQ-unsplash.jpg"
        },
        {
            id: 3,
            name: {
                short: "Premium nike shoe",
                long: "Premium nike SD-2020 limited edition shoe"
            },
            discount: 2,
            price: {
                curr: 9000,
                prev: 10000
            },
            image: "/assets/images/products/bags/adejoke-drilling-XBqD7PZp5mQ-unsplash.jpg"
        },
        {
            id: 4,
            name: {
                short: "Premium nike shoe",
                long: "Premium nike SD-2020 limited edition shoe"
            },
            discount: 2,
            price: {
                curr: 9000,
                prev: 10000
            },
            image: "/assets/images/products/bags/adejoke-drilling-XBqD7PZp5mQ-unsplash.jpg"
        },
        {
            id: 5,
            name: {
                short: "Premium nike shoe",
                long: "Premium nike SD-2020 limited edition shoe"
            },
            discount: 2,
            price: {
                curr: 9000,
                prev: 10000
            },
            image: "/assets/images/products/bags/adejoke-drilling-XBqD7PZp5mQ-unsplash.jpg"
        },
        {
            id: 6,
            name: {
                short: "Premium nike shoe",
                long: "Premium nike SD-2020 limited edition shoe"
            },
            discount: 2,
            price: {
                curr: 9000,
                prev: 10000
            },
            image: "/assets/images/products/bags/adejoke-drilling-XBqD7PZp5mQ-unsplash.jpg"
        },
    ]
    return (
        <div className="product-list">
            <h2 className="product-list__title">Top sales for today</h2>
            <div className="product-list__container">
                {
                    products.slice(0, 6).map(product => <ProductItem key={product.id} product={product} />)
                }
                
            </div>
        </div>
    )
}

export default ProductList
