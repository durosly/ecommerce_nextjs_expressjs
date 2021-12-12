import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import Loader from 'react-loader-spinner'
import { selectProducts, setProducts } from '../../../features/dashboard/dashboardSlice'
import ProductListItem from './product-list-item'

const fetcher = url => fetch(url).then(r => r.json())

function ProductListTable({ query, offset }) {
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const { data, error } = useSWR(`/admin/product?${query ? "query=" + query + "&" : ""}${offset ? "offset=" + offset : ""}`, fetcher)

    useEffect(() => {
        if(data) {
            if(data.status === true) {
                dispatch(setProducts(data.products))
            } 
        }
    }, [data])

    // if(data.status === true) {
    //     dispatch(setProducts(data.products))
    // }

    return (
        <table className="dbkit-table">
            <tbody>
                <tr className="heading-td">
                    <td>Product Name</td>
                    <td>Price (&#8358;)</td>
                    <td>Quantity</td>
                    <td>Discount (&#37;)</td>
                    <td>&nbsp;</td>
                </tr>
                {
                    error ? (
                        <tr>
                            <td colSpan="4">
                                <p className="text-danger">An error occured</p>
                            </td>
                        </tr>
                    ) : (
                        data ? (

                            products && products.length > 0 ? (
                                products.map(product => <ProductListItem key={product.id} product={product} />)
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <p className="text-danger">No products found</p>
                                    </td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="4">
                                    <Loader color="#000" type="TailSpin" height={20} />
                                    <p className="text-info">Loading...</p>
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    )
}

export default ProductListTable