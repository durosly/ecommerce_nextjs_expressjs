import { useState } from 'react'

const list = ["nice", "niceto", "friend", "go", "golang", "golandy"]

function SpecificDataEntry( props ) {
    const { fields, setFields} = props
    const { items } = fields
    const [search, setSearch] = useState("")
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
                                    <li className="list-group-item list-group-item-action" onClick={() => setFields({ ...fields, items: [...items, { id: Math.random(), name: item }]})}>{ item }</li>
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
                    items.map(item => (

                        <li className="list-group-item d-flex justify-between align-items-center">
                            <p className="product-name">{ item.name }</p>
                            <button className="btn btn-danger">&times;</button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default SpecificDataEntry