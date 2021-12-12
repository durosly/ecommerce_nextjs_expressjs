import CategoryUploadForm from '../forms/category-upload-form'
import SpecialCategoryUploadForm from '../forms/special-category-upload-form'

function CategoryUpload() {

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
                                    <CategoryUploadForm />
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
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