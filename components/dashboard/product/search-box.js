

function ProductSearchBox() {
    return (
        <div className="search-box">
            <form action="#">
                <input type="text" name="search" placeholder="Search..." required />
                <i className="ti-search"></i>
            </form>
        </div>
    )
}

export default ProductSearchBox