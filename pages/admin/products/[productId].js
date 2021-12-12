import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import Loader from 'react-loader-spinner'
import moment from 'moment'
import commaNumber from 'comma-number'
import DashboardLayout from '../../../components/dashboard/layout/dashboard-layout'
import ProductImage from '../../../components/dashboard/product/details/product-image'
import ProductDetailsDisplay from '../../../components/dashboard/product/details/product-details-display'
import ProductQuantity from '../../../components/dashboard/product/details/product-quantity'
import ProductDiscount from '../../../components/dashboard/product/details/product-discount'
import ProductPrice from '../../../components/dashboard/product/details/product-price'
import ProductDelete from '../../../components/dashboard/product/details/product-delete'

const initialState = {
    id: '',
    name: "",
    price: '',
    discount: 0,
    category: "",
    quantity: 0,
    image: "",
    desc: "",
    createdAt: null,
    updatedAt: null
}

function ProductDetails() {
    const [product, setProduct] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const router = useRouter()
    const { productId } = router.query

    useEffect(() => {
        async function loadProduct() {
            setIsError(false)
            setIsLoading(true)
            try {
                const response = await fetch(`/admin/product/${productId}`)
                const data = await response.json()

                if(data.status === true) {
                    setProduct(data.product)
                    setIsLoading(false)
                    setIsError(false)
                } else {
                    throw new Error()
                }

            } catch(error) {
                setIsLoading(false)
                setIsError(true)
            }
        }

        loadProduct()
    }, [])
    return (
        <>
            <Head>
                <title>Product Details - Safe plaze</title>
            </Head>

            <DashboardLayout>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                {
                                    isLoading ? (
                                        <>
                                            Loading...
                                            <Loader type="TailSpin" color="#000" width={20} height={20} />
                                        </>
                                    ) : (
                                        isError ? (
                                            <p className="text-danger">An error occured loading product</p>
                                        ) : (
                                            <>
                                                <div className="invoice-area">
                                                    <div className="invoice-head">
                                                        <div className="row">
                                                            <div className="iv-left col-6">
                                                                <span style={{ textTransform: "capitalize" }}>{ product.name }</span>
                                                            </div>
                                                            <div className="iv-right col-6 text-md-right">
                                                                <span>ID: { product.id }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ProductImage product={product} setProduct={setProduct} />
                                                    <div className="row align-items-center">
                                                        <div className="col-md-6">
                                                            <div className="invoice-address">
                                                                <h3>{  product.category }</h3>
                                                                {/* <h5>Verdie Hintz</h5> */}
                                                                <ProductDetailsDisplay product={product} setProduct={setProduct} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 text-md-right">
                                                            <ul className="invoice-date">
                                                                <li>Upload Date : { moment(product.createdAt).format("ddd DD | MM | YYYY") }</li>
                                                                <li>Updated Date : { moment(product.updatedAt).format("ddd DD | MM | YYYY") }</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="invoice-table table-responsive mt-5">
                                                        <table className="table table-bordered table-hover">
                                                            <thead>
                                                                <tr className="text-capitalize">
                                                                    <th>Price</th>
                                                                    <th>Discount (%)</th>
                                                                    <th>Quantity</th>
                                                                    <th>Gross</th>
                                                                    <th>Net</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <ProductPrice product={product} setProduct={setProduct} />
                                                                    <ProductDiscount product={product} setProduct={setProduct} />
                                                                    <ProductQuantity product={product} setProduct={setProduct} />
                                                                    <td>&#8358; { commaNumber(product.price * product.quantity) }</td>
                                                                    <td>&#8358; { commaNumber((product.price - (product.price * product.discount / 100)) * product.quantity) }</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <ProductDelete product={product} />
                                            </>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default ProductDetails

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const admin = req.session.get("admin")

        if(!admin) {
            return {
                redirect: {
                    destination: '/admin',
                    permanent: false,
                }
            }
        }

        return {
            props: { }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)