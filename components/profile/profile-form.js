import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'

const initialState = {
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    phonenumber: "",
    address: "",
    city: "",
    state: ""
}

function ProfileForm() {
    const { addToast } = useToasts()
    const [profile, setProfile] = useState(initialState)
    const [isEdited, setIsEdited] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleChange = e => {
        setIsEdited(true)
        setProfile({...profile, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsUpdating(true)

        try {
            const response = await fetch("user/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) })
            const { status, message, data } = await response.json()

            if(status === true) {
                setProfile(data)
                addToast(message, { appearance: 'success' })
                setIsEdited(false)
                setIsUpdating(false)
            } else {
                throw new Error(message)
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsUpdating(false)
        }
    }

    useEffect(() => {
        async function getUser() {
            setIsLoading(true)
            try {
                const response = await fetch("/user/profile")
                const { profile, status } = await response.json()
                
                if(status === true) {
                    setProfile(profile)
                    setIsLoading(false)
                } else {
                    throw new Error("Something went wrong")
                }
            } catch(error) {
                setIsLoading(false)
                addToast("Failed to load profile details", { appearance: "error" })
            }
        }

        getUser()
    }, [])
    
    return (
        <form onSubmit={handleSubmit} action="/profile" className="profile__form">
            {
                isLoading ? (
                    <div className="form__group">
                        <Loader type="TailSpin" color="#1196c8" height={100} width={100} />
                    </div>
                ) : (
                    <>
                        <div className="form__group form__split">
                            <div className="input__group">
                                <label htmlFor="firstname">First Name</label>
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    id="firstname" 
                                    required 
                                    value={profile.firstname ? profile.firstname : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>

                            <div className="input__group">
                                <label htmlFor="lastname">Last Name</label>
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    id="lastname" 
                                    required 
                                    value={profile.lastname ? profile.lastname : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                        <div className="form__group">
                            <div className="input__group">
                                <label htmlFor="middlename">Middle Name</label>
                                <input 
                                    type="text" 
                                    name="middlename" 
                                    id="middlename"
                                    value={profile.middlename ? profile.middlename : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                        <div className="form__group">
                            <div className="input__group">
                                <label htmlFor="user-email">E-mail</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="user-email" 
                                    required 
                                    value={profile.email ? profile.email : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                        <div className="form__group">
                            <div className="input__group">
                                <label htmlFor="phonenumber">Contact</label>
                                <input 
                                    type="phone" 
                                    name="phonenumber" 
                                    id="phonenumber" 
                                    required 
                                    value={profile.phonenumber ? profile.phonenumber : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                        <div className="form__group">
                            <div className="input__group">
                                <label htmlFor="address">Address</label>
                                <input 
                                    type="text" 
                                    name="address" 
                                    id="address" 
                                    required 
                                    value={profile.address ? profile.address : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                        <div className="form__group form__split">
                            <div className="input__group">
                                <label htmlFor="city">City</label>
                                <input 
                                    type="text" 
                                    name="city" 
                                    id="city" 
                                    required 
                                    value={profile.city ? profile.city : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>

                            <div className="input__group">
                                <label htmlFor="state">State</label>
                                <input 
                                    type="text" 
                                    name="state" 
                                    id="state" 
                                    required
                                    value={profile.state ? profile.state : ""}
                                    onChange={handleChange}
                                    disabled={isUpdating}
                                />
                            </div>
                        </div>
                        <div className="form__group">
                            <button className="btn profile__form--save" disabled={!isEdited || isUpdating}>
                                {
                                    isUpdating ? <Loader type="ThreeDots" color="#1196c8" width={40} height={20} /> : <span>Save</span>
                                }
                            </button>
                        </div>
                    </>
                )
            }
            
        </form>
    )
}

export default ProfileForm