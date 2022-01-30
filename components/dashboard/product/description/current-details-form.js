import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

function CurrenDetailsFrom() {
    const router = useRouter()
    const { productId } = router.query
    const [details, setDetails] = useState([])
    const [detail, setDetail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { addToast } = useToasts()

    function handleSubmit(e) {
        e.preventDefault()
        setDetails([...details, detail])
        setDetail("")
    }

    function removeItem(index) {
        const newList = details.filter((item, i) => {
            if(i !== index) return item
        })

        setDetails(newList)
    }

    function editItem(index) {
        setDetail(details[index])
        removeItem(index)
    }

    async function handleSave() {
        try {
            if(details.length === 0) {
                throw new Error("No details entered yet.")
            }
            if(isLoading) {
                addToast("Saving still in progress", { appearance: "warning" })
                return
            }
            setIsLoading(true)
            const response = await fetch(`/admin/product/${ productId }/details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details)
            })
            const data = await response.json()

            const { status, message } = data
            if(status === true) {
                setDetails([])
                setIsLoading(false)
                addToast(message, { appearance: "success" })
            } else {
                throw new Error(message)
            }
        } catch(error) {
            setIsLoading(false)
            addToast(error.message, { appearance: 'error' })
        }
    }

    return (
        <>
        
            <form disabled={isLoading} onSubmit={handleSubmit} action="/product-details" method="post">
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Details..."
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button disabled={isLoading} className="btn btn-primary text-nowrap">
                            <span>Add</span>
                            <i className="fas fa-plus ml-2"></i>
                        </button>
                    </div>
                </div>
            </form>
            {
                details && details.length > 0 && (
                    <>
                        <hr />
                        <h2>Current entries</h2>
                        <ul className="list-group">
                            {
                                details.map((item, i) => (

                                    <li key={i} className="list-group-item d-flex justify-between align-center">
                                        <span className="desc">{ item }</span>
                                        <div className="button-container text-nowrap">

                                            <button onClick={() => editItem(i)} className="btn">
                                                <i className="fas fa-edit text-primary"></i>
                                            </button>
                                            <button onClick={() => removeItem(i)} className="btn ml-2">
                                                <i className="fas fa-trash-alt text-danger"></i>
                                            </button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="submit-btn-container mt-3 text-right">
                            <button onClick={handleSave} disabled={isLoading} className="btn btn-primary">
                                {
                                    isLoading ? (
                                        <>
                                            <Loader type='TailSpin' height={16} width={16} />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <span>Save</span>
                                            <i className="fas fa-save text-white ml-2"></i>
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CurrenDetailsFrom