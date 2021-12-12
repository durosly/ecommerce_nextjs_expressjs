import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import { setCategories, selectCategories } from '../../../features/dashboard/dashboardSlice'

const initialState = {
    name: '',
    desc: '',
    price: "",
    discount: "",
    amount: "",
    category: "0"
}

function ProductUpload() {
    const [isLoading, setIsLoading] = useState(false)
    const [fields, setFields] = useState(initialState)
    const [selectFile, setSelectFile] = useState()
    const [isFileSelected, setIsFileSelected] = useState(false)

    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [categoryLoading, setCategoryLoading] = useState(false)
    const categories = useSelector(selectCategories)
    useEffect(() => {
        async function loadCategories() {
            try {
                setCategoryLoading(true)
                const response = await fetch("/admin/category")
                const data = await response.json()

                if(data.status) {
                   dispatch(setCategories(data.categories))
                   setCategoryLoading(false)
                } else {
                    throw new Error("Something went wrong")
                }

            } catch(error) {
                setCategoryLoading(false)
                addToast(error.message, { appearance: "error" })
            }
        }

        loadCategories()
    }, [])

    async function handleFileChange(e) {
        setSelectFile(e.target.files[0])
        setIsFileSelected(true)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("submitting...")
        try {
            setIsLoading(true)
            const customForm = new FormData()
            customForm.append("inputs", JSON.stringify(fields))
            customForm.append("image", selectFile)

            const response = await fetch("/admin/product", {
                method: "POST",
                body: customForm
            })

            const data = await response.json()

            if(data.status) {
                setFields(initialState)
                setSelectFile("")
                addToast(data.message, { appearance: "success" })
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
        <div className="row">
            <div className="col-12 mt-5">
                <div className="card">
                    <div className="card-body">
                        {
                            categoryLoading ? (
                                <Loader color="#000" type="TailSpin" height="20" />
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h4 className="header-title">Create new product</h4>
                                    <div className="form-group">
                                        <input 
                                            name="name"
                                            className="form-control" 
                                            type="text" 
                                            placeholder="name..." 
                                            value={fields.name}
                                            disabled={isLoading}
                                            required
                                            onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            name="desc"
                                            className="form-control" 
                                            placeholder="Description..."
                                            disabled={isLoading}
                                            required
                                            value={fields.desc}
                                            onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                            ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            name="price"
                                            className="form-control" 
                                            type="number" 
                                            placeholder="price..." 
                                            disabled={isLoading}
                                            required
                                            value={fields.price}
                                            onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            name="amount"
                                            className="form-control" 
                                            type="number" 
                                            id="example-text-input" 
                                            placeholder="amount available for sale..." 
                                            disabled={isLoading}
                                            required
                                            value={fields.amount}
                                            onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            name="discount"
                                            className="form-control" 
                                            type="number" 
                                            id="example-text-input" 
                                            placeholder="discount in percentage..." 
                                            disabled={isLoading}
                                            required
                                            value={fields.discount}
                                            onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select name="category" disabled={isLoading} required className="form-control-lg" value={fields.category} onChange={e => setFields({...fields, [e.target.name]: e.target.value})}>
                                            <option value="0" disabled>Choose category</option>
                                            {
                                                categories.map(c => <option key={c.id} value={c.id}>{ c.name }</option>)
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="custom-file">
                                            <input 
                                                name="image"
                                                type="file" 
                                                className="custom-file-input" 
                                                id="inputGroupFile01" 
                                                disabled={isLoading}
                                                required
                                                accept="image/*" 
                                                onChange={handleFileChange}
                                            />
                                            <label className="custom-file-label text-ellipsis" htmlFor="inputGroupFile01">
                                            { 
                                                isFileSelected ? (
                                                    <span>{ selectFile.name }</span>
                                                ) : (
                                                    <span>Choose Product Image</span>
                                                )
                                            }
                                            </label>
                                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpload