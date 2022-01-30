import CurrenDetailsFrom from "./current-details-form"
import ProductDetailsDisplay from './product-details-display'

function ProductDetailsArea() {

    return (
        <div className="card">
            <div className="card-body">

                <h1>Product Details</h1>

                <hr />
                <CurrenDetailsFrom />
                <hr />
                <ProductDetailsDisplay />
            </div>
        </div>
    )
}

export default ProductDetailsArea