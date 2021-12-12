import Header from "./header/header"
import TopNotice from "./notice/topNotice"
import Footer from './footer/Footer'

function UserLayout({ children }) {
    return (
        <>
            <TopNotice />
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </>
    )
}

export default UserLayout
