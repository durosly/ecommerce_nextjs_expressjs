import Head from 'next/head'
import { useSelector } from 'react-redux'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import NotificationArea from '../../components/dashboard/notification/notification-area'
import SearchBox from '../../components/dashboard/search/search-box'
import DisplayBtn from '../../components/dashboard/sidebar/display-btn'
import SidebarMenu from '../../components/dashboard/sidebar/sidebar-menu'
import { selectDisplayNav } from '../../features/dashboard/dashboardSlice'
import PageTitle from '../../components/dashboard/page-title'

function Dashboard() {
    const displayNav = useSelector(selectDisplayNav)
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>Dashboard - Safe plaze</title>
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
                    <div className="main-content-inner">
                        {/* <!-- sales report area start --> */}
                        <div className="sales-report-area sales-style-two">
                            <div className="row">
                                <div className="col-xl-3 col-ml-3 col-md-6 mt-5">
                                    <div className="single-report">
                                        <div className="s-sale-inner pt--30 mb-3">
                                            <div className="s-report-title d-flex justify-content-between">
                                                <h4 className="header-title mb-0">Product Sold</h4>
                                                <select className="custome-select border-0 pr-3">
                                                    <option selected="">Last 7 Days</option>
                                                    <option value="0">Last 7 Days</option>
                                                </select>
                                            </div>
                                        </div>
                                        <canvas id="coin_sales4" height="100"></canvas>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-ml-3 col-md-6 mt-5">
                                    <div className="single-report">
                                        <div className="s-sale-inner pt--30 mb-3">
                                            <div className="s-report-title d-flex justify-content-between">
                                                <h4 className="header-title mb-0">Gross Profit</h4>
                                                <select className="custome-select border-0 pr-3">
                                                    <option selected="">Last 7 Days</option>
                                                    <option value="0">Last 7 Days</option>
                                                </select>
                                            </div>
                                        </div>
                                        <canvas id="coin_sales5" height="100"></canvas>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-ml-3 col-md-6  mt-5">
                                    <div className="single-report">
                                        <div className="s-sale-inner pt--30 mb-3">
                                            <div className="s-report-title d-flex justify-content-between">
                                                <h4 className="header-title mb-0">Orders</h4>
                                                <select className="custome-select border-0 pr-3">
                                                    <option selected="">Last 7 Days</option>
                                                    <option value="0">Last 7 Days</option>
                                                </select>
                                            </div>
                                        </div>
                                        <canvas id="coin_sales6" height="100"></canvas>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-ml-3 col-md-6 mt-5">
                                    <div className="single-report">
                                        <div className="s-sale-inner pt--30 mb-3">
                                            <div className="s-report-title d-flex justify-content-between">
                                                <h4 className="header-title mb-0">New Coustomers</h4>
                                                <select className="custome-select border-0 pr-3">
                                                    <option selected="">Last 7 Days</option>
                                                    <option value="0">Last 7 Days</option>
                                                </select>
                                            </div>
                                        </div>
                                        <canvas id="coin_sales7" height="100"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- sales report area end --> */}
                        {/* <!-- order list area start --> */}
                        <div className="card mt-5">
                            <div className="card-body">
                                <h4 className="header-title">Todays Order List</h4>
                                <div className="table-responsive">
                                    <table className="dbkit-table">
                                        <tbody>
                                            <tr className="heading-td">
                                                <td>Product Name</td>
                                                <td>Product Code</td>
                                                <td>Order Status</td>
                                                <td>Client Number</td>
                                                <td>Zip Code</td>
                                                <td>View Order</td>
                                            </tr>
                                            <tr>
                                                <td>Ladis Sunglass</td>
                                                <td>#894750374</td>
                                                <td><span className="pending_dot">Pending</span></td>
                                                <td>01976 74 92 00</td>
                                                <td>9241</td>
                                                <td>View Order</td>
                                            </tr>
                                            <tr>
                                                <td>Ladis Sunglass</td>
                                                <td>#894750374</td>
                                                <td><span className="shipment_dot">Shipment</span></td>
                                                <td>01976 74 92 00</td>
                                                <td>9241</td>
                                                <td>View Order</td>
                                            </tr>
                                            <tr>
                                                <td>Ladis Sunglass</td>
                                                <td>#894750374</td>
                                                <td><span className="pending_dot">Pending</span></td>
                                                <td>01976 74 92 00</td>
                                                <td>9241</td>
                                                <td>View Order</td>
                                            </tr>
                                            <tr>
                                                <td>Ladis Sunglass</td>
                                                <td>#894750374</td>
                                                <td><span className="confirmed _dot">Confirmed </span></td>
                                                <td>01976 74 92 00</td>
                                                <td>9241</td>
                                                <td>View Order</td>
                                            </tr>
                                            <tr>
                                                <td>Ladis Sunglass</td>
                                                <td>#894750374</td>
                                                <td><span className="pending_dot">Pending</span></td>
                                                <td>01976 74 92 00</td>
                                                <td>9241</td>
                                                <td>View Order</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="pagination_area pull-right mt-5">
                                    <ul>
                                        <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                                        <li><a href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- order list area end --> */}
                        <div className="row">
                            {/* <!-- product sold area start --> */}
                            <div className="col-xl-8 col-lg-7 col-md-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between mb-4">
                                            <h4 className="header-title mb-0">Product Slod</h4>
                                            <select className="custome-select border-0 pr-3">
                                                <option selected="">Today</option>
                                                <option value="0">Last 7 Days</option>
                                            </select>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="dbkit-table">
                                                <tbody>
                                                    <tr className="heading-td">
                                                        <td>Product Name</td>
                                                        <td>Revenue</td>
                                                        <td>Sold</td>
                                                        <td>Discount</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ladis Sunglass</td>
                                                        <td>$56</td>
                                                        <td>$160</td>
                                                        <td>$20</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ladis Sunglass</td>
                                                        <td>$26</td>
                                                        <td>$500</td>
                                                        <td>$20</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ladis Sunglass</td>
                                                        <td>$26</td>
                                                        <td>$500</td>
                                                        <td>$20</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ladis Sunglass</td>
                                                        <td>$56</td>
                                                        <td>$250</td>
                                                        <td>$10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ladis Sunglass</td>
                                                        <td>$56</td>
                                                        <td>$125</td>
                                                        <td>$50</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pagination_area pull-right mt-5">
                                            <ul>
                                                <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                                                <li><a href="#">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- product sold area end --> */}
                            {/* <!-- team member area start --> */}
                            <div className="col-xl-4 col-lg-5 col-md-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-sm-flex flex-wrap justify-content-between mb-4 align-items-center">
                                            <h4 className="header-title mb-0">Team Member</h4>
                                            <form className="team-search">
                                                <input type="text" name="search" placeholder="Search Here" />
                                            </form>
                                        </div>
                                        <div className="member-box">
                                            <div className="s-member">
                                                <div className="media align-items-center">
                                                    <img src="/admin/assets/images/team/team-author1.jpg" className="d-block ui-w-30 rounded-circle" alt="" />
                                                    <div className="media-body ml-5">
                                                        <p>Amir Hamza</p><span>Manager</span>
                                                    </div>
                                                    <div className="tm-social">
                                                        <a href="#"><i className="fa fa-phone"></i></a>
                                                        <a href="#"><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="s-member">
                                                <div className="media align-items-center">
                                                    <img src="/admin/assets/images/team/team-author2.jpg" className="d-block ui-w-30 rounded-circle" alt="" />
                                                    <div className="media-body ml-5">
                                                        <p>Anamul Kabir</p><span>UI design</span>
                                                    </div>
                                                    <div className="tm-social">
                                                        <a href="#"><i className="fa fa-phone"></i></a>
                                                        <a href="#"><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="s-member">
                                                <div className="media align-items-center">
                                                    <img src="/admin/assets/images/team/team-author3.jpg" className="d-block ui-w-30 rounded-circle" alt="" />
                                                    <div className="media-body ml-5">
                                                        <p>Animesh Mondol</p><span>UI design</span>
                                                    </div>
                                                    <div className="tm-social">
                                                        <a href="#"><i className="fa fa-phone"></i></a>
                                                        <a href="#"><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="s-member">
                                                <div className="media align-items-center">
                                                    <img src="/admin/assets/images/team/team-author4.jpg" className="d-block ui-w-30 rounded-circle" alt="" />
                                                    <div className="media-body ml-5">
                                                        <p>Faruk Hasan</p><span>UI design</span>
                                                    </div>
                                                    <div className="tm-social">
                                                        <a href="#"><i className="fa fa-phone"></i></a>
                                                        <a href="#"><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="s-member">
                                                <div className="media align-items-center">
                                                    <img src="/admin/assets/images/team/team-author5.jpg" className="d-block ui-w-30 rounded-circle" alt="" />
                                                    <div className="media-body ml-5">
                                                        <p>Sagor Chandra</p><span>Motion Designer</span>
                                                    </div>
                                                    <div className="tm-social">
                                                        <a href="#"><i className="fa fa-phone"></i></a>
                                                        <a href="#"><i className="fa fa-envelope"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- team member area end --> */}
                        </div>
                    </div>
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
            
            {/* <!-- offset area end --> */}
            {/* <!-- jquery latest version --> */}
            <script src="/admin/assets/js/vendor/jquery-2.2.4.min.js"></script>
            {/* <!-- bootstrap 4 js --> */}
            <script src="/admin/assets/js/popper.min.js"></script>
            <script src="/admin/assets/js/bootstrap.min.js"></script>
            <script src="/admin/assets/js/owl.carousel.min.js"></script>
            <script src="/admin/assets/js/metisMenu.min.js"></script>
            <script src="/admin/assets/js/jquery.slimscroll.min.js"></script>
            <script src="/admin/assets/js/jquery.slicknav.min.js"></script>

            {/* <!-- start chart js --> */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
            {/* <!-- start highcharts js --> */}
            <script src="https://code.highcharts.com/highcharts.js"></script>
            {/* <!-- start zingchart js --> */}
            <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
            <script>
            {/* zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/"; */}
            {/* ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "ee6b7db5b51705a13dc2339db3edaf6d"]; */}
            </script>
            {/* <!-- all line chart activation --> */}
            <script src="/admin/assets/js/line-chart.js"></script>
            {/* <!-- all bar chart activation --> */}
            <script src="/admin/assets/js/bar-chart.js"></script>
            {/* <!-- all pie chart --> */}
            <script src="/admin/assets/js/pie-chart.js"></script>
            {/* <!-- others plugins --> */}
            <script src="/admin/assets/js/plugins.js"></script>
            {/* <script src="/admin/assets/js/scripts.js"></script> */}
        </>

    )
}

export default Dashboard

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