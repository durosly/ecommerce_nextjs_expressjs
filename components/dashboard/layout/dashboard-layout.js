import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectDisplayNav } from '../../../features/dashboard/dashboardSlice'
import NotificationArea from '../notification/notification-area'
import SearchBox from '../search/search-box'
import DisplayBtn from '../sidebar/display-btn'
import SidebarMenu from '../sidebar/sidebar-menu'
import PageTitle from '../page-title'

function DashboardLayout({ children }) {
    const displayNav = useSelector(selectDisplayNav)
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="/admin/assets/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/admin/assets/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/admin/assets/css/themify-icons.css" />
                <link rel="stylesheet" href="/admin/assets/css/metisMenu.css" />
                <link rel="stylesheet" href="/admin/assets/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/admin/assets/css/slicknav.min.css" />
                
                <link rel="stylesheet" href="/admin/assets/css/typography.css" />
                <link rel="stylesheet" href="/admin/assets/css/default-css.css" />
                <link rel="stylesheet" href="/admin/assets/css/styles.css" />
                <link rel="stylesheet" href="/admin/assets/css/responsive.css" />
            </Head>
            <div className={`page-container ${!displayNav && "sbar_collapsed"}`}>
                <SidebarMenu />
                <div className="main-content">
                    <div className="header-area">
                        <div className="row align-items-center">
                            {/* <!-- nav and search button --> */}
                            <div className="col-md-6 col-sm-8 clearfix">
                                <DisplayBtn />
                                <SearchBox />
                            </div>
                            {/* <!-- profile info & task notification --> */}
                            <div className="col-md-6 col-sm-4 clearfix">
                                <NotificationArea />
                            </div>
                        </div>
                    </div>
                    {/* <!-- header area end --> */}
                    {/* <!-- page title area start --> */}
                    <PageTitle />
                    {/* <!-- page title area end --> */}
                    <div className="main-content-inner">{ children }</div>
                </div>
                {/* <!-- main content area end --> */}
                {/* <!-- footer area start--> */}
                <footer>
                    <div className="footer-area">
                        <p>Safe plaze.</p>
                    </div>
                </footer>
                {/* <!-- footer area end--> */}

            </div>
        </>
    )

}

export default DashboardLayout