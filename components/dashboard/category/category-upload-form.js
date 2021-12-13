import { useState } from 'react'
import CategoryUploadForm from '../forms/category-upload-form'
import SpecialCategoryUploadForm from '../forms/special-category-upload-form'

function CategoryUpload() {
    const [tab, setTab] = useState("#pills-home")

    function handleClick(e) {
        e.preventDefault()

        const href = e.target.hash

        setTab(href)

    }

    return (
        <div className="row">
            <div className="col-12 mt-5">
                {/* <!-- tab start --> */}
                <div className="col-lg-6 mt-5">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="header-title">Create new category</h4>
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a onClick={handleClick} className={`nav-link ${tab === "#pills-home" && "active"}`} id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Regular</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={handleClick} className={`nav-link ${tab === "#pills-profile" && "active"}`} id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Special</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className={`tab-pane fade ${tab === "#pills-home" && "show active"}`} role="tabpanel" aria-labelledby="pills-home-tab">
                                    <CategoryUploadForm />
                                </div>
                                <div className={`tab-pane fade ${tab === "#pills-profile" && "show active"}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <SpecialCategoryUploadForm />
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