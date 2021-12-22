import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

const fetcher = url => fetch(url).then(r => r.json())

function SpecificDataEntry( props ) {
    const { addToast } = useToasts()
    const [offset, setOffset] = useState(0)
    const { fields, setFields} = props
    const { items } = fields
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const { data, error } = useSWR((search && search.trim() != "") ? `/admin/product/search?query=${search}&offset=${offset}` : null, fetcher)
    useEffect(() => {
        if(!error && data) {

            const { status, products } = data
            if(status === true) {
                setSuggestions(products)
            } else {
                setSuggestions([])
            }
        } else {
            setSuggestions([])
        }

    }, [data])

    function addToList(item) {
        // check if list is full
        if(fields.items.length < 6) {
            // unique values only
            setFields({ ...fields, items: [...new Set([...items, item])]})
            // empty search fields
            setSearch("")
        } else {
            addToast("Can't add more than 6 items", { appearance: "warning"})
        }
    }

    function removeItem(e, id) {
        e.preventDefault()

        const newItem = items.filter(item => item.id !== id)
        setFields({ ...fields, items: newItem})
    }
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
                    (search && search.trim() != "") && !error && !data ? (
                        <Loader color='#000' type='TailSpin' height={14} />
                    ) : (
                        suggestions.length > 0 ? (

                            suggestions.map(item => {
                                return (
                                    <li key={item.id} className="list-group-item list-group-item-action" onClick={ () => addToList(item) }>{ item.name }</li>
                                )
                            })
                        ) : (
                            (search && search.trim() != "")  && <li className='text-danger'>No record found</li>
                        )
                        
                    )
                }
            </ul>
            <hr />
            <h4>Added</h4>
            <ul className="list-group mb-3">
                {
                    items.map(item => (

                        <li key={item.id} className="list-group-item d-flex justify-between align-items-center">
                            <p className="product-name">{ item.name }</p>
                            <button className="btn btn-danger" onClick={e => removeItem(e, item.id)}>&times;</button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default SpecificDataEntry