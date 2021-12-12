import { useSelector } from 'react-redux'
import { selectCategories } from '../../../features/dashboard/dashboardSlice'
import CategoryTableRow from './category-table-row'

function CategoryTable({ status }) {
    const categories = useSelector(selectCategories)
    return (
        <div className="row">
            {/* <!-- table primary start --> */}
            <div className="col-lg-6 mt-5">
                <div className="card">
                    <div className="card-body">
                        {
                            status ? (
                                <p className="text-info">Loading...</p>
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
            {/* <!-- table primary end --> */}

        </div>
    )
}

export default CategoryTable