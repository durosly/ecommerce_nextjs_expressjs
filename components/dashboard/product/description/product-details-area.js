import CurrenDetailsFrom from "./current-details-form"


function ProductDetailsArea() {
    return (
        <div className="card">
            <div className="card-body">

                <h1>Product Details</h1>

                <hr />
                <CurrenDetailsFrom />
                <hr />
                <h2>Saved details</h2>
                <ul className="list-group">
                <li className="list-group-item d-flex justify-between align-center">
                        <span className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, laboriosam quaerat aspernatur voluptatibus consequuntur veniam dolores quibusdam illum quas ex! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, mollitia.</span>
                        <div className="button-container text-nowrap">
                            <button className="btn ml-2 text-nowrap">
                                <i className="fas fa-trash-alt text-danger"></i>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductDetailsArea