import Head from 'next/head'
// import config from 'config'
// import { withIronSession } from 'next-iron-session'
import UserLayout from "../components/userLayout"
import EmptyIllustration from '../components/cart/empty-illustration'
import ListItem from '../components/cart/list-item'

function Cart() {
    return (
        <UserLayout>
            <Head>
                <title>Safe plaze || cart</title>
            </Head>
            <div className="container">
                <section className="cart">
                    <h2 className="cart__title">Cart</h2>
                    {/* <EmptyIllustration /> */}

                    <ul className="cart__list">
                        <ListItem />
                    </ul>
                    <hr />
                    <div className="cart__sub-action">
                        <p className="cart__sub-total">
                            <span className="cart__sub-total--label">Sub total: </span>
                            <span className="cart__sub-total--value">&#8358; 3,000</span>
                        </p>
                        <form className="cart__cart-checkout-form" action="/add-to-cart">
                            <button className="cart__checkout-btn">
                                <i className="fas fa-luggage-cart"></i>
                                &nbsp;
                                checkout
                            </button>
                        </form>
                    </div>
                </section>
            </div>
            
        </UserLayout>
    )
}

export default Cart

// export const getServerSideProps = withIronSession(
//     async ({ req, res }) => {
//         const user = req.session.get("user")

//         if(user) {
//             return {
//                 props: {
//                     user
//                 }
//             }
//         }

//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             }
//         }

//     }, {
//         cookieName: config.get("cookie.name"),
//         password: config.get("cookie.password")
//     }
// )