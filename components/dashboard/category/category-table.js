import { useSelector } from 'react-redux'
import { selectCategories, selectSpecialCategories } from '../../../features/dashboard/dashboardSlice'
import CategoryTableRow from './category-table-row'
import SpecialCategoryTableRow from './special-category-table-row'
import Loader from 'react-loader-spinner'

function CategoryTable({ categoryLoading, spcialCategoryLoading }) {
    const categories = useSelector(selectCategories)
    const specialCategories = useSelector(selectSpecialCategories)
    return (
        <div className="row">
            {/* <!-- regular category table start --> */}
            <div className="col-md-6 mt-5">
                <div className="card">
                    <div className="card-body">
                        {
                            categoryLoading ? (
                                <p className="text-center">
                                    <Loader type='TailSpin' width={30} />
                                    <span>Loading...</span>
                                </p>
                            ) : (
                                <>
                                    <h4 className="header-title">Categories</h4>
                                    {
                                        categories && categories.length > 0 ? (
                                            <div className="single-table">
                                                <div className="table-responsive">
                                                    <table className="table text-center">
                                                        <thead className="text-uppercase bg-primary">
                                                            <tr className="text-white">
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">date</th>
                                                                <th scope="col">delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                categories.map((c, i) => <CategoryTableRow key={c.id} category={c} position={i + 1} />)
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-danger">No categories to display</p>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* <!-- regular category table end --> */}
            {/* special category table starts */}
            <div className="col-md-6 mt-5">
                <div className="card">
                    <div className="card-body">
                        {
                            spcialCategoryLoading ? (
                                <p className="text-center">
                                    <Loader type='TailSpin' width={30} />
                                    <span>Loading...</span>
                                </p>
                            ) : (
                                <>
                                    <h4 className="header-title">Special Categories</h4>
                                    {
                                        specialCategories && specialCategories.length > 0 ? (
                                            <div className="single-table">
                                                <div className="table-responsive">
                                                    <table className="table text-center">
                                                        <thead className="text-uppercase bg-primary">
                                                            <tr className="text-white">
                                                                <th scope="col">ID</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">date</th>
                                                                <th scope="col">delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                specialCategories.map((c, i) => <SpecialCategoryTableRow key={c.id} category={c} position={i + 1} />)
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-danger">No categories to display</p>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* special category table end */}
        </div>
    )
}

export default CategoryTable