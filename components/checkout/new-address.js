import { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

function NewAddress({ address, setAddress, state, setState }) {
    const [states, setStates] = useState([])
    const [isLoadingStates, setIsLoadingStates] = useState(false)


    useEffect(() => {
        async function loadStates() {
            setIsLoadingStates(true)
            try {
                const response = await fetch("user/states")
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

    return (
        <>
            <div className="checkout__address-input">
                <select disabled={isLoadingStates} name='state' value={state} onChange={e => setState(e.target.value)}>
                    <option disabled value=""> -- select state --</option>
                    {
                        states.map(state => <option key={state.id} value={ state.name }>{ state.name }</option>)
                    }
                </select>
                {
                    isLoadingStates && (
                        <div style={{ display: "flex", marginTop: "10px"}}>
                            <span>Loading...</span>
                            <Loader type='TailSpin' height={16} width={16} />
                        </div>
                    )
                }
            </div>
            <div className="checkout__address-input">
                <input type="text" name="address" id="address" placeholder='Enter address' value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <p>Please, ensure that address is accurate before making payments</p>
        </>
    )
}

export default NewAddress