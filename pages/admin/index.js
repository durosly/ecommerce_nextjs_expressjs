import Head from 'next/head'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import LoginForm from '../../components/dashboard/forms/login-form'

function AdminLogin() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>Admin Login - Safe plaze</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/admin/assets/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/admin/assets/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/admin/assets/css/themify-icons.css" />
                <link rel="stylesheet" href="/admin/assets/css/metisMenu.css" />
                <link rel="stylesheet" href="/admin/assets/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/admin/assets/css/slicknav.min.css" />
                
                <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css" media="all" />
                
                <link rel="stylesheet" href="/admin/assets/css/typography.css" />
                <link rel="stylesheet" href="/admin/assets/css/default-css.css" />
                <link rel="stylesheet" href="/admin/assets/css/styles.css" />
                <link rel="stylesheet" href="/admin/assets/css/responsive.css" />
                
                <script src="/admin/assets/js/vendor/modernizr-2.8.3.min.js"></script>
            </Head>
            <div className="login-area">
                <div className="container">
                    <div className="login-box ptb--100">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const admin = req.session.get("admin")

        if(admin) {
            return {
                redirect: {
                    destination: '/admin/dashboard',
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