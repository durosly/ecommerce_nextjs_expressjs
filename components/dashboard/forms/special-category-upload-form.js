import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import SpecificDataEntry from '../category/special/specific'
import addSpecialCategoryHandler from '../../../form-handlers/admin/add-special-category-handler'

const initialState = {
    name: "",
    type: "specific",
    to: null,
    from: null,
    items: []
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
            const response = await addSpecialCategoryHandler(fields)
            const data = await response.json()

            if(data.status) {
                //dispatch(addToCategories(data.category))
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
                <p className="font-weight-bold">Type</p>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="type" 
                        id="specific" 
                        value="specific" 
                        checked={fields.type === 'specific'} 
                        onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                        disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="specific">specific</label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="type" 
                        id="price" 
                        value="price" 
                        checked={fields.type === 'price'} 
                        onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                        disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="price">price</label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="type" 
                        id="discount" 
                        value="discount" 
                        checked={fields.type === 'discount'} 
                        onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                        disabled={isLoading}
                    />
                    <label className="form-check-label" htmlFor="discount">discount</label>
                </div>
            </div>
            {
                fields.type && fields.type === "specific" ? (
                    <SpecificDataEntry fields={fields} setFields={setFields}  />
                ) : (
                    <div className="form-group">
                        <p className="font-weight-bold">Range</p>
                        <div>
                            <label htmlFor="min">Minimum</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                name="from" 
                                id="min"  
                                value={fields.from ? fields.from : ""}
                                onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="max">Maximum</label>
                            <input 
                                className="form-control" 
                                type="number" 
                                name="to" 
                                id="max" 
                                value={fields.to ? fields.to : ""}
                                onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                            />
                        </div>
                    </div>
                )
            }
            
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