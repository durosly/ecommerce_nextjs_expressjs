import { useState } from 'react'
import ProductListTable from './product-list-table'
import ProductSearchBox from './search-box'
import ProductOffsetBtn from './product-offset-btn'

function ProductDisplay() {
    const [query, setQuery] = useState(null)
    const [offset, setOffset] = useState(0)
    

    return (
        <div className="row">
            {/* <!-- product sold area start --> */}
            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                            <h4 className="header-title mb-0">Products</h4>
                            <ProductSearchBox />
                        </div>
                        <div className="table-responsive">
                            <ProductListTable query={query} offset={offset} />
                        </div>
                        <div className="pagination_area pull-right mt-5">
                            <ProductOffsetBtn />
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- product sold area end --> */}
        </div>
    )
}

export default ProductDisplay