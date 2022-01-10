import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import commaNumber from 'comma-number'

function ProductDeliveryFeeDisplay() {
    const router = useRouter()
    const { addToast } = useToasts()
    const { productId } = router.query
    const [deliveryFees, setDeliveryFees] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        async function loadDeliveryFees() {
            try {

                setIsLoading(true)
                const response = await fetch(`/admin/product/${ productId }/delivery-fee`)
                const data = await response.json()
                const { status, message, fees } = data
    
                if(status === true) {
                    setDeliveryFees(fees)
                    setIsLoading(false)
                } else {
                    throw new Error(message)
                }
            } catch(error) {
                addToast(error.message, { appearance: "error" })
                setIsLoading(false)
            }
        }

        loadDeliveryFees()
    }, [])

    async function handleDelete(id) {
        try {
            if(isDeleting) throw new Error("Currently deleting a record. Please wait...")

            setIsDeleting(true)
            const response = await fetch(`/admin/product/${ id }/delivery-fee`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            const { status, message, fee } = data

            if(status === true) {
                const fileteredFees = deliveryFees.filter(item => item.id !== fee.id)
                setIsDeleting(false)
                setDeliveryFees(fileteredFees)
                addToast("success. Reload to add state to selections", { appearance: "success" })
            } else {
                throw new Error(message)
            }
        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsDeleting(false)
        }
    }

    return (
        <div className="card mt-3">
            <div className="card-body">
                <h2>Delivery locations and fees</h2>
                <div className="table-responsive">
                    <table className="dbkit-table">
                        <tbody>
                            {
                                !isLoading ? (
                                    <>
                                        <tr className="heading-td">
                                            <td className='font-weight-bold'>State</td>
                                            <td className='font-weight-bold'>Fee (&#8358;)</td>
                                            <td className='font-weight-bold'>Action</td>
                                        </tr>
                                        {
                                            deliveryFees.map(fee => (
                                                <tr key={ fee.id }>
                                                    <td>{ fee.state }</td>
                                                    <td>{ fee.price === 0 ? "Free" : commaNumber(fee.price) }</td>
                                                    <td>
                                                        <button onClick={() => handleDelete(fee.id)} className="btn btn-sm btn-danger">
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <tr>
                                        <td>Loading...</td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductDeliveryFeeDisplay