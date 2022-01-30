import { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'

function ProductDetailsDisplay() {
    const [details, setDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { addToast } = useToasts()
    const router = useRouter()
    const { productId } = router.query
    useEffect(() => {
        async function loadDetails() {
            try {
                setIsLoading(true)

                const response = await fetch(`/user/products/${ productId }/details`)

                const data = await response.json()

                const { status, message, details:loadedDetails } = data

                if(status === true) {
                    setDetails(loadedDetails)
                    setIsLoading(false)
                } else {
                    throw new Error(message)
                }

            } catch(error) {
                setIsLoading(false)
                addToast(error.message, { appearance: 'error' })            }
        }

        loadDetails()
    }, [])

    return (
        <section className="product-description">
            <h2 className="product-description__title">Product details</h2>
            <div className="product-description__content">
                {
                    isLoading ? (
                        <div>
                            <Loader type="TailSpin" height={16} width={16} color="#000" />
                            Loading...
                        </div>
                    ) : (
                        <ul className="product-description__list">
                            {
                                details.map(item => (
                                    <li key={item.id}>{ item.details }</li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </section>
    )
}

export default ProductDetailsDisplay