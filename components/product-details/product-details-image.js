import Image from 'next/image'

function ProductDetailsImageDisplay({ product }) {
    const { image, name } = product
    return (
        <div className="product-image__display">
            <div className="product-image__main">
                <Image src={`/uploads/products/${image}`} layout="responsive" alt={name} width={500} height={500} className="product-image__main--image" />
            </div>
            <div className="product-image__thumbnails">
                <div className="product-image__thumbnail">
                    <Image src="/uploads/products/adejoke-drilling-XBqD7PZp5mQ-unsplash---1634961320610.jpg" {...thumbnailStyle} alt=""  />
                </div>
                <div className="product-image__thumbnail">
                    <Image src="/uploads/products/adejoke-drilling-XBqD7PZp5mQ-unsplash---1634961320610.jpg" {...thumbnailStyle} alt=""  />
                </div>
                <div className="product-image__thumbnail">
                    <Image src="/uploads/products/adejoke-drilling-XBqD7PZp5mQ-unsplash---1634961320610.jpg" {...thumbnailStyle} alt=""  />
                </div>
                <div className="product-image__thumbnail">
                    <Image src="/uploads/products/adejoke-drilling-XBqD7PZp5mQ-unsplash---1634961320610.jpg" {...thumbnailStyle} alt=""  />
                </div>
                <div className="product-image__thumbnail">
                    <Image src="/uploads/products/adejoke-drilling-XBqD7PZp5mQ-unsplash---1634961320610.jpg" {...thumbnailStyle} alt="" />
                </div>
                <div className="product-image__thumbnail">
                    <Image src="/uploads/products/adejoke-drilling-XBqD7PZp5mQ-unsplash---1634961320610.jpg" {...thumbnailStyle} alt="" />
                </div>
            </div>
        </div>
    )
}

const thumbnailStyle = {
    height: 100,
    width: 100,
    layout: "fixed"
}

export default ProductDetailsImageDisplay