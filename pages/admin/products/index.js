import Head from 'next/head'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import ProductUpload from '../../../components/dashboard/forms/product-upload'
import DashboardLayout from '../../../components/dashboard/layout/dashboard-layout'
import ProductDisplay from '../../../components/dashboard/product/product-display'

function Products() {
    return (
        <>
            <Head>
                <title>Products - Safe plaze</title>
            </Head>
            <DashboardLayout>

                {/* Product display table */}
                <ProductDisplay />
                {/* end product display table */}

                {/* Product upload form */}
                <ProductUpload />
                {/* end product upload form */}
            </DashboardLayout>
        </>
    )
}

export default Products

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