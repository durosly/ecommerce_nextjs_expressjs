import { useState } from 'react'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import commaNumber from 'comma-number'

function ProductPrice({ product, setProduct }) {
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [change, setChange] = useState(product.price)

    function handleChange(e) {
        const number = parseInt(e.target.value)

        setChange(number)
    }

    async function handleBlur() {
        setIsEditing(false)
        try {
            setIsLoading(true)
            const response = await fetch(`/admin/product/${product.id}/price`, {
                method: "PUT",
                body: JSON.stringify({ price: change }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            if(data.status === true) {
                setProduct({...product, price: data.price, updatedAt: data.updatedAt})
                addToast(data.message, { appearance: "success" })
                setIsLoading(false)
            } else {
                throw new Error(data.message)
            }
        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsLoading(false)
        }
    }
    
    return (
        <td>
            {
                isLoading ? (
                    <span>
                        Loading...
                        <Loader type="TailSpin" color="#000" width={16} height={16} />
                    </span>
                ) : (
                    isEditing ? (
                        <input type="number" onChange={handleChange} onBlur={handleBlur} value={change} autoFocus={true} />
                    ) : (
                        <>
                            <span style={{display: "inline-block", marginRight: "10px"}}>&#8358; { commaNumber(product.price) }</span>
                            <span onClick={() => setIsEditing(true)} className="badge badge-pill badge-primary">
                                <i className="ti-pencil"></i>
                            </span>
                        </>
                    )
                )
            }
        </td>
    )
}

export default ProductPrice