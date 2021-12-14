import { useState } from 'react'

const list = ["nice", "niceto", "friend", "go", "golang", "golandy"]

function SpecificDataEntry() {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    return (
        <>
            <div className="form-group">
                <input 
                    className="form-control" 
                    type="search" 
                    name="search" 
                    id="search" 
                    placeholder="Search product by id, name and category" 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <ul className="list-group search-dropdown mb-3">
                {
                    search && search.trim() !== "" && (
                        
                        list.map(item => {
                            if (item.includes(search)) {
                                return (
                                    <li className="list-group-item list-group-item-action" onClick={() => setProducts([...products, item])}>{ item }</li>
                                )
                            }
                        })
                        
                    )
                }
            </ul>
            <hr />
            <h4>Added</h4>
            <ul className="list-group mb-3">
                {
                    products.map(p => (

                        <li className="list-group-item d-flex justify-between align-items-center">
                            <p className="product-name">{ p }</p>
                            <button className="btn btn-danger">&times;</button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default SpecificDataEntry