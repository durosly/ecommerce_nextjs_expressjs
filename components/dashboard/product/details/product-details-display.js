import { useState, useRef } from 'react'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

function ProductDetailsDisplay({ product, setProduct }) {
    const descRef = useRef(null)
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [change, setChange] = useState(product.desc)

    async function handleBlur() {
        setIsEditing(false)
        if(change.trim() === product.desc) return
        setIsLoading(true)
        try {
            const response = await fetch(`/admin/product/${product.id}/desc`, {
                method: "PUT",
                body: JSON.stringify({ desc: change}),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            const data = await response.json()

            if(data.status === true) {
                addToast(data.message, { appearance: "success" })
                setProduct({...product, desc: data.desc, updatedAt: data.updatedAt })
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
        <>
            {
                isLoading ? (
                    <p style={{display: "flex"}}>
                        <span>Loading...</span>
                        <Loader type="TailSpin" color="#000" height={16} />
                    </p>
                ) : (
                    isEditing ? (
                        <p>
                            <textarea autoFocus={true} ref={descRef} onBlur={handleBlur} onChange={e => setChange(e.target.value)} value={change} className="form-control"></textarea>
                        </p>
                    ) : (
                        <>
                            <p>{ product.desc }</p>
                            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                                <i className="ti-pencil"></i>
                            </button>
                        </>
                    )
                )
            }
        </>
    )
}

export default ProductDetailsDisplay