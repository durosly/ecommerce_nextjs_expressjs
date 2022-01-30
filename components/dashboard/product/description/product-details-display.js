import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

const fetcher = url => fetch(url).then(r => r.json())
function ProductDetailsDisplay() {
    const router = useRouter()
    const { productId } = router.query
    const { addToast } = useToasts()
    const [details, setDetails] = useState([])
    const { data, error } = useSWR(`/admin/product/${ productId }/details`, fetcher, { refreshInterval: 1000 })

    useEffect(() => {

        if(data) {
            const { status, message, details } = data
            if(status === true) {
                setDetails(details)
            }
        }
    }, [data])

    async function handleDelete(id) {
        try {
            const response = await fetch(`/admin/product/${ id }/details`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()

            const { status, message } = data

            if(status === true) {
                addToast(message, { appearance: "success" })
            } else {
                throw new Error(message)
            }

        } catch(error) {
            addToast(error.message, { appearance: 'error' })
        }
    }
    return (
        <>
            <h2>Saved details</h2>
            <ul className="list-group">
                {
                    ( !error && !data ) ? (
                        <li className="list-group-item justify-center">
                            <Loader type='TailSpin' height={16} width={16} />
                        </li>
                    ) : (
                        error ? (
                            <li className="list-group-item list-group-item-danger justify-center">
                                An error occured
                            </li>
                        ) : (
                            data ? (
                                details.map(detail => (

                                    <li key={detail.id} className="list-group-item d-flex justify-between align-center">
                                        <span className="desc">{ detail.details }</span>
                                        <div className="button-container text-nowrap">
                                            <button onClick={() => handleDelete(detail.id)} className="btn ml-2 text-nowrap">
                                                <i className="fas fa-trash-alt text-danger"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item list-group-item-danger">
                                    Something went wrong
                                </li>
                            )
                        )
                    )
                }
                
            </ul>
        </>
    )
}

export default ProductDetailsDisplay