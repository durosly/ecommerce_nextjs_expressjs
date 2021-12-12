import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import addCategoryHandler from '../../../form-handlers/admin/add-category-handler'
import { addToCategories } from '../../../features/dashboard/dashboardSlice'

const initialState = {
    name: "",
    desc: ""
}

function CategoryUploadForm() {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [fields, setFields] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
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
            <p className="text-muted font-14 mb-4">Regular categories would determine where vendors would upload products to.</p>
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

export default CategoryUploadForm