import { useState } from 'react'
import Head from 'next/head'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import DashboardLayout from '../../../components/dashboard/layout/dashboard-layout'
import ProductSummary from '../../../components/dashboard/product/details/product-summary'
import ProductTechDetails from '../../../components/dashboard/product/techdetails/product-tech-details'
import ProductDeliveryFees from '../../../components/dashboard/product/delivery/product-delivery-fees'
import ProductRateReviews from '../../../components/dashboard/product/rate-reviews/product-rates-reviews'


function ProductDetails() {
    const [tab, setTab] = useState("sum")
    
    return (
        <>
            <Head>
                <title>Product Details - Safe plaze</title>
            </Head>

            <DashboardLayout>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body d-flex flex-column d-md-block">
                                <button onClick={() => setTab("sum")} className={`btn ${ tab === "sum"? "btn-primary" : "btn-secondary"}`}>Summary</button>
                                <button onClick={() => setTab("tec")} className={`btn my-2 my-md-auto ml-md-2 ${ tab === "tec"? "btn-primary" : "btn-secondary"}`}>Technical details</button>
                                <button onClick={() => setTab("del")} className={`btn my-2 my-md-auto ml-md-2 ${ tab === "del"? "btn-primary" : "btn-secondary"}`}>Delivery fees</button>
                                <button onClick={() => setTab("rat")} className={`btn my-2 my-md-auto ml-md-2 ${ tab === "rat"? "btn-primary" : "btn-secondary"}`}>Ratings and reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        {
                            tab === 'sum' && <ProductSummary />
                        }
                        {
                            tab === 'tec' && <ProductTechDetails />
                        }
                        {
                            tab === 'del' && <ProductDeliveryFees />
                        }
                        {
                            tab === 'rat' && <ProductRateReviews />
                        }
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