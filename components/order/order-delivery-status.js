import { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'

function OrderDeliveryStatus({ id }) {
    const [isLoading, setIsLoading] = useState(false)
    const [orderStatus, setOrderStatus] = useState(null)
    //const [isError, setIsError] = useState(false)
    const { addToast } = useToasts()

    useEffect(() => {
        async function loadStatus() {
            try {
                setIsLoading(true)
                const response = await fetch(`/user/order/${ id }/status`)
                const data = await response.json()

                const { status, message, orderStatus: currentOrderStatus } = data

                if(status === true) {
                    
                    setOrderStatus(currentOrderStatus)
                    setIsLoading(false)

                } else {
                    throw new Error(message)
                }
            } catch(error) {
                addToast(error.message, { appearance: "error" })
                setIsLoading(false)
            }

        }

        loadStatus()
    }, [id])
    return (
        <>
            <h2 className="order__status">Delivery Status</h2>
            <ul className="order__delivery">
                {
                    isLoading ? (
                        <li>
                            <>
                                <Loader type='TailSpin' height={16} width={16} color='#000' />
                                Loading...
                            </>
                        </li>
                    ) : (
                        <>
                            {
                                orderStatus > 0 && (
                                    <li className="order__delivery-status">
                                        <div className="order__delivery-status--icon">
                                            <i className="fas fa-spinner"></i>
                                        </div>
                                        <span className="order__delivery-status--message">Processing</span>
                                    </li>
                                )
                            }
                            {
                                orderStatus > 1 && (
                                    <li className="order__delivery-status">
                                        <div className="order__delivery-status--icon">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <span className="order__delivery-status--message">Accepted</span>
                                    </li>
                                )
                            }
                            {
                                orderStatus > 2 && (
                                    <li className="order__delivery-status">
                                        <div className="order__delivery-status--icon">
                                            <i className="fas fa-truck"></i>
                                        </div>
                                        <span className="order__delivery-status--message">Delivering</span>
                                    </li>
                                )
                            }
                            {
                                orderStatus === 4 && (
                                    <li className="order__delivery-status">
                                        <div className="order__delivery-status--icon">
                                            <i className="fas fa-dolly"></i>
                                        </div>
                                        <span className="order__delivery-status--message">Delivered</span>
                                    </li>
                                )
                            }
                            {
                                orderStatus === 5 && (
                                    <li className="order__delivery-status">
                                        <div className="order__delivery-status--icon">
                                            <i className="fas fa-times"></i>
                                        </div>
                                        <span className="order__delivery-status--message">Cancelled</span>
                                    </li>
                                )
                            }
                        </>
                    )
                }
                  
            </ul>
        </>
    )
}

export default OrderDeliveryStatus