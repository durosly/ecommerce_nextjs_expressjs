import { useState, useRef } from 'react'
import Image from 'next/image'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'

function ProductImage({ product, setProduct, blurURL, setBlurURL }) {
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    const fileRef = useRef(null)
    function handleClick() {
        fileRef.current.click()
    }

    console.log(blurURL)
    async function handleChange(e) {
        const formData = new FormData()
        formData.append("image", e.target.files[0])
        try {
            setIsLoading(true)
            const response = await fetch(`/admin/product/${product.id}/image`, {
                method: "PUT",
                body: formData
            })
            const data = await response.json()
            if(data.status === true) {
                setProduct({...product, image: data.image, updatedAt: data.updatedAt})
                setBlurURL(data.blurURL)
                addToast("upload successful", { appearance: "success" })
                setIsLoading(false)
            } else {
                throw new Error()
            }

        } catch(error) {
            setIsLoading(false)
            addToast("Something went wrong uploading file", { appearance: "error" })
        }
    }

    return (
        <div className="row justify-center">
            <input onChange={handleChange} ref={fileRef} type="file" name="image" id="image" accept="image/*" style={{ display: "none" }} />
            <div className="col-md-6">
                {
                    blurURL ? (
                        <Image 
                            className="img-fluid" 
                            src={`/uploads/products/${product.image}` } 
                            layout="responsive" 
                            width={20} 
                            height={20} 
                            placeholder="blur"
                            blurDataURL={blurURL}
                        />
                    ) : (
                        <p>Parsing image...</p>
                    )
                }
                <button disabled={isLoading} onClick={handleClick} type="button" className="btn btn-primary mt-2">
                    {
                        isLoading ? (
                            <Loader type="TailSpin" color="#000" height={16} />
                        ) : (
                            <i className="fas fa-upload"></i>
                        )
                    }
                </button>
            </div>
        </div>
    )
}

export default ProductImage