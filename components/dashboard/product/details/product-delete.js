import { useState } from 'react'
import router from 'next/router'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

function ProductDelete({ product }) {
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    async function handleClick() {
        try {
            setIsLoading(true)
            const response = await fetch(`/admin/product/${product.id}`)
            const data = await response.json()

            if(data.status === true) {
                addToast(data.message, { appearance: 'success' })
                router.push("/admin/products")
            } else {
                throw new Error(data.message)
            }
        } catch(error) {
            setIsLoading(false)
            addToast(error.message, { appearance: "error" })
        }
    }
    return (
        <div className="text-right">
            <button disabled={isLoading} onClick={handleClick} className="btn btn-danger">
                {
                    isLoading ? (
                        <>
                            Loading...
                            <Loader type="TailSpin" width={16} height={16} />
                        </>
                    ) : (
                        <>
                            Delete 
                            <i className="ti-trash"></i>
                        </>
                    )
                }
            </button>
        </div>
    )
}

export default ProductDelete