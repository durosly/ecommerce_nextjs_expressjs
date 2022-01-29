import { useState, useEffect } from 'react'
import config from 'config'
import { withIronSession } from 'next-iron-session'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { setUser } from '../features/user/userSlice'
import UserLayout from "../components/userLayout"
import getOrderModel from '../server/database/models/order'
import sequelize from '../server/database'
import { DataTypes, Op } from 'sequelize'
import moment from 'moment'
import OrderItem from '../components/order/order-item'
import { useToasts } from 'react-toast-notifications'
import OrderDeliveryStatus from '../components/order/order-delivery-status'

function Order({ user, orders, orderDates }) {
    const dispatch = useDispatch()
    const [userOrders, setUserOrders] = useState(orders)
    const [activeOrder, setActiveOrder] = useState(null)
    const [orderDate, setOrderDate] = useState("")
    const [isLoadingOrders, setIsLoadingOrders] = useState(false)
    const { addToast } = useToasts()

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })

    useEffect(() => {
        if(isLoadingOrders) return

        if(orders.length > 0) {
            setActiveOrder(userOrders[0].id)
        }
    }, [userOrders, isLoadingOrders])

    useEffect(() => {
        if(!orderDate) return

        async function loadOrders() {
            try {
                setIsLoadingOrders(true)
                const response = await fetch(`/user/orders/${orderDate}`)
                const data = await response.json()

                const { status, message, orders: responseOrders } = data

                if(status === true) {

                    setUserOrders(responseOrders)

                    setIsLoadingOrders(false)

                } else {
                    throw new Error(message)
                }

            } catch(error) {
                setIsLoadingOrders(false)

                addToast(error.message, { appearance: "error" })
            }
        }

        loadOrders()
    }, [orderDate])

    const dates = [...new Set([...orderDates])]

    function handleOrderSelection(id) {
        setActiveOrder(id)
    }

    // console.log(orders)
    // console.log(orderDates)
    // console.log([...new Set([...orderDates])])

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
                            <select value={orderDate} onChange={e => setOrderDate(e.target.value)} className="order__list-date-picker" name="order_date" id="order_date">
                                {
                                    dates && dates.length > 0 ? (
                                        dates.map((date, i) => (<option key={i} value={date}>{ moment(date).format("ddd Do MMM, YYYY") }</option>))
                                    ) : (
                                        <option disabled value="">None</option>
                                    )
                                }
                                {/* <option value="2021-04-23">Thurs 4th, 2021</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="today">Today</option> */}
                            </select>
                        </form>
                    </div>
                    <ul className="order__list scrollbar-1">
                        {
                            userOrders && userOrders.length > 0 ? (
                                userOrders.map(order => (<OrderItem key={order.id} handleOrderSelection={handleOrderSelection} active={activeOrder === order.id} order={order} />))
                            ) : (
                                <li className="order__list-item">
                                    <p style={{ color: "red" }}>No orders yet</p>
                                </li>

                            )
                        }
                    </ul>

                    {
                        activeOrder && <OrderDeliveryStatus id={activeOrder} />
                    }

                </section>
            </main>
        </UserLayout>
    )
}

export default Order

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user")
        const Order = getOrderModel(sequelize, DataTypes)
        const orderIds = []
        let lastOrderDates = []

        if(user) {
            const lastOrderDatesQ = await Order.findAll({ where: { userId: user.id }, order: [["createdAt", "DESC"]], attributes: [["createdAt", "date"]]})
            //console.log(lastOrderDate.dataValues.date)
            if(lastOrderDatesQ.length > 0) {
                lastOrderDates = lastOrderDatesQ.map(item => item.dataValues.date)
                // lastOrderDates = [...new Set([...lastOrderDates])]
                lastOrderDates = JSON.parse(JSON.stringify(lastOrderDates))
                const lastOrderDate = lastOrderDatesQ[0].dataValues.date

                const recentDate = moment(lastOrderDate).format("YYYY-MM-DD")
                // console.log(recentDate)

                const recentOrders = await Order.findAll({ where: { createdAt: { [Op.startsWith]: recentDate }, userId: user.id }})
                //console.log(recentOrders)

                if(recentOrders.length > 0) {
                    recentOrders.forEach(order => {
                        const item = order.dataValues
                        orderIds.push({
                            id: item.id,
                            productId: item.productId
                        })
                    })
                }
            }

            return {
                props: {
                    user,
                    orders: orderIds,
                    orderDates: lastOrderDates
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