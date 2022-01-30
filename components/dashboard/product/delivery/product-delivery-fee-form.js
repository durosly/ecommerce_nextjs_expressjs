import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'

function ProductDeliveryFeeForm() {
    const router = useRouter()
    const { productId } = router.query
    const { addToast } = useToasts()

    const [states, setStates] = useState([])
    const [isLoadingStates, setIsLoadingStates] = useState(false)
    const [selection, setSelection] = useState("")
    const [fee, setFee] = useState("")
    const [selections, setSelections] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)



    useEffect(() => {
        async function loadStates() {
            setIsLoadingStates(true)
            try {
                const response = await fetch(`/admin/product/${ productId }/delivery-fee-state`)
                const data = await response.json()
                //const stateNames = data.map(item => item.name)
                const { status, message, states } = data
                if(status === true) {
                    setStates(states)
                    setIsLoadingStates(false)
                } else {
                    throw new Error(message)
                }
            } catch(error) {
                console.log(error)
                setIsLoadingStates(false)
            }
        }

        loadStates()
    }, [])

    function removeFromSelection(s) {
        const newSelections = selections.filter(select => select !== s)
        const filteredStates = [...new Set([...states, s])].sort()

        setSelections(newSelections)
        setStates(filteredStates)
    }

    function handleSelection(e) {
        const newSelections = [...new Set([...selections, e.target.value])].sort()
        const filteredStates = states.filter(state => state.name !== e.target.value)

        setSelections(newSelections)
        setStates(filteredStates)
        setSelection("")
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if(selections.length > 0) {
                if(fee && Number(fee) || fee === 0 ||fee === "0") {

                    setIsSubmitting(true)
        
                    const response = await fetch(`/admin/product/${productId}/delivery-fee`, {
                        method: "POST",
                        body: JSON.stringify({ states: selections, fee }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
        
                    const data = await response.json()
                    const { status, message } = data
        
                    if(status === true) {
                        addToast(message, { appearance: "success" })
                        setSelections([])
                        setFee("")
                        setIsSubmitting(false)
                    } else {
                        throw new Error(message)
                    }
                } else {
                    throw new Error("Fee must be a number")
                }

            } else {
                throw new Error("No state selected")
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsSubmitting(false)
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <h1>Delivery fees</h1>
                <hr />
                <p className='text-muted mb-2'>Enter zero for free delivery. Any state not selected is termed as not available for delivery</p>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit} action="/delivery-fee">
                            <div className="form-group">
                                <select value={selection} onChange={handleSelection} disabled={isLoadingStates} style={{ height: "36px"}} name="state" id="state" className="form-control">
                                    <option value="" disabled>-- select state --</option>
                                    {
                                        states && states.length > 0 && states.map(state => <option key={state.id} value={state.name}>{ state.name }</option>)
                                    }
                                </select>
                                {
                                    isLoadingStates && <Loader type="TailSpin" height={16} width={16} />
                                }
                                
                            </div>
                            <div className="form-group">
                                {
                                    selections.map(s => (
                                        <span key={s} onClick={() => removeFromSelection(s)} style={{ cursor: "pointer" }} className="badge badge-pill badge-primary p-3 ml-2">
                                            <span>{ s }</span>
                                            <i className="fas fa-times ml-2"></i>
                                        </span>
                                    ))
                                }
                            </div>
                            <div className="form-group">
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Delivery fee..." 
                                    value={fee}
                                    onChange={e => setFee(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <button disabled={ isSubmitting || isLoadingStates } className="btn btn-sm btn-primary">
                                    {
                                        isSubmitting ? (
                                            <Loader type='TailSpin' height={16} width={16} />
                                        ) : (
                                            <>
                                                <span>Save</span>
                                                <i className="fas fa-plus ml-2"></i>
                                            </>
                                        )
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDeliveryFeeForm