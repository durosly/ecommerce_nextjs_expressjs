import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import { useDispatch } from 'react-redux'

const initialState = {
    name: "",
    desc: ""
}

function SpecialCategoryUploadForm() {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [fields, setFields] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [categoryTab, setCategoryTab] = useState(1)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await addCategoryHandler(fields)
            const data = await response.json()

            if(data.status) {
                dispatch(addToCategories(data.category))
                addToast(data.message, { appearance: "success" })
                setFields(initialState)
                setIsLoading(false)
            } else {
                throw new Error(data.message)
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-muted font-14 mb-4">Special categories would be displayed on index page for advertisement purposes.</p>
            <div className="form-group">
                <input 
                    name="name"
                    className="form-control" 
                    type="text" 
                    id="example-text-input" 
                    placeholder="category name..." 
                    value={fields.name}
                    onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <textarea 
                    name="desc" 
                    id="desc" 
                    cols="30" 
                    rows="3" 
                    className="form-control" 
                    placeholder="A short description..."
                    value={fields.desc}
                    onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                    disabled={isLoading}
                ></textarea>
            </div>
            <div className="form-group">
                <p className="font-weight-bold">Type</p>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="specific" value="specific" />
                    <label className="form-check-label" htmlFor="specific">Specific</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="price" value="price" />
                    <label className="form-check-label" htmlFor="price">Price</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="discount" value="discount" />
                    <label className="form-check-label" htmlFor="discount">Discount</label>
                </div>
            </div>
            <div className="form-group">
                <p className="font-weight-bold">Range</p>
                <div>
                    <label htmlFor="min">Minimum</label>
                    <input className="form-control" type="number" name="min_range" id="min" />
                </div>
                <div>
                    <label htmlFor="max">Maximum</label>
                    <input className="form-control" type="number" name="max_range" id="max" />
                </div>
            </div>
            <div className="form-group">
                <input className="form-control" type="search" name="search" id="search" placeholder="Search product by id, name and category" />
            </div>
            <div className="form-group">
                product selected is to be displayed here
            </div>
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {
                    isLoading ? (
                        <Loader color="#000" type="ThreeDots" height="16" />
                    ) : (
                        <span>Submit form</span>
                    )
                }

            </button>
        </form>
    )
}

export default SpecialCategoryUploadForm