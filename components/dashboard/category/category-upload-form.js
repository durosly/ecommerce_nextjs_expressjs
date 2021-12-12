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

function CategoryUpload() {
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
        <div className="row">
            <div className="col-12 mt-5">
                {/* <!-- tab start --> */}
                <div class="col-lg-6 mt-5">
                    <div class="card">
                        <div class="card-body">
                            <h4 className="header-title">Create new category</h4>
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Regular</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Special</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
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
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
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
                                                <p>Type</p>
                                                <div>
                                                    <label htmlFor="specific">Specific</label>
                                                    <input type="radio" name="type" id="specific" value="specific" />
                                                </div>
                                                <div>
                                                    <label htmlFor="price">Price</label>
                                                    <input type="radio" name="type" id="price" value="price" />
                                                </div>
                                                <div>
                                                    <label htmlFor="discount">Discount</label>
                                                    <input type="radio" name="type" id="discount" value="discount" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <p>Range</p>
                                                <div>
                                                    <label htmlFor="min">Minimum</label>
                                                    <input type="number" name="min_range" id="min" value="min" />
                                                </div>
                                                <div>
                                                    <label htmlFor="max">Maximum</label>
                                                    <input type="number" name="max_range" id="max" value="max" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="search" name="search" id="search" placeholder="Search product by id, name and category" />
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- tab end --> */}
                {/* <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <h4 className="header-title">Create new category</h4>
                            <p className="text-muted font-14 mb-4">Categories would determine where vendors would upload products to.</p>
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
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default CategoryUpload