import { useRouter } from 'next/router'
import Link from 'next/link'

function PageTitle() {
    const router = useRouter()
    const routes = router.pathname.split("/")
    let displayRoute = routes[routes.length - 1]
    if(routes.length === 4) {
        displayRoute = routes[2]
        if(routes[2].toLowerCase() === 'products') displayRoute += " / details"
    }

    return (
        <div className="page-title-area">
            <div className="row align-items-center">
                <div className="col-sm-6">
                    <div className="breadcrumbs-area clearfix">
                        <h4 className="page-title pull-left">{ displayRoute }</h4>
                    </div>
                </div>
                <div className="col-sm-6 clearfix">
                    <div className="user-profile pull-right">
                        <img className="avatar user-thumb" src="/admin/assets/images/author/avatar.png" alt="avatar" />
                        <h4 className="user-name dropdown-toggle" data-toggle="dropdown">Kumkum Rai <i className="fa fa-angle-down"></i></h4>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Message</a>
                            <a className="dropdown-item" href="#">Settings</a>
                            <Link  href="/admin/logout">
                                <a className="dropdown-item">Log Out</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTitle