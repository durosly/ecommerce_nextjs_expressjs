import { useEffect } from 'react'
import config from 'config'
import { withIronSession } from 'next-iron-session'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { setUser } from '../features/user/userSlice'
import UserLayout from "../components/userLayout"

function Order({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })

    return (
        <UserLayout>
            <Head>
                <title>Safe plaze || order</title>
            </Head>

            <main className="container">
                <section className="order">
                    <h2 className="order__title">Order</h2>

                    <div className="order__list-date">
                        <form className="order__list-date-form" action="/orders" method="get">
                            <select className="order__list-date-picker" name="order_date" id="order_date">
                                <option value="2021-04-23">Thurs 4th, 2021</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="today">Today</option>
                            </select>
                        </form>
                    </div>
                    <ul className="order__list scrollbar-1">
                        <li className="order__list-item order__list-item--active">
                            <img className="order__list-item--image" src="/assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                        <li className="order__list-item">
                            <img className="order__list-item--image" src="assets/images/products/shoes/maksim-larin-NOpsC3nWTzY-unsplash---1634555052200.jpg" alt="nike shoe" />
                            <div className="order__list-item-title-count">
                                <h3 className="order__list-item--title">Nike shoe</h3>
                                <span className="order__list-item--count">(1&times;)</span>
                            </div>
                            <div className="order__list-item-price-rate">
                                <p className="order__list-item--price">&#8358; 3,400</p>
                                <span className="order__list-item--rate">
                                    <i className="fas fa-star"></i>
                                    4.5
                                </span>
                            </div>
                        </li>
                    </ul>

                    <h2 className="order__status">Delivery Status</h2>
                    <ul className="order__delivery">
                        <li className="order__delivery-status">
                            <div className="order__delivery-status--icon">
                                <i className="fas fa-spinner"></i>
                            </div>
                            <span className="order__delivery-status--message">Processing</span>
                        </li>
                        <li className="order__delivery-status">
                            <div className="order__delivery-status--icon">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <span className="order__delivery-status--message">Accepted</span>
                        </li>
                        <li className="order__delivery-status">
                            <div className="order__delivery-status--icon">
                                <i className="fas fa-truck"></i>
                            </div>
                            <span className="order__delivery-status--message">Delivering</span>
                        </li>
                        <li className="order__delivery-status">
                            <div className="order__delivery-status--icon">
                                <i className="fas fa-dolly"></i>
                            </div>
                            <span className="order__delivery-status--message">Delivered</span>
                        </li>
                        <li className="order__delivery-status">
                            <div className="order__delivery-status--icon">
                                <i className="fas fa-times"></i>
                            </div>
                            <span className="order__delivery-status--message">Cancelled</span>
                        </li>
                    </ul>
                </section>
            </main>
        </UserLayout>
    )
}

export default Order

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user")

        if(user) {
            return {
                props: {
                    user
                }
            }
        }

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)