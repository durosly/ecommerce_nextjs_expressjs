import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import logo from '../../public/assets/images/logo/logo-top-transparent.png'
import signupSchema from '../../components/signup/signupSchema'
import signupHandler from '../../form-handlers/signup'

const initialState = {
    fullname: "",
    email: "",
    phonenumber: "",
    password: ""
}

function Signup() {
    const router = useRouter()
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formFields, setFormFields] = useState(initialState)

    const handleFormData = async e => {
        e.preventDefault()
        setIsLoading(true)
        const { error, value } = signupSchema.validate(formFields)
        
        try {
            if(error) {
                throw error
            } else {
                const response = await signupHandler(value)
                const data = await response.json()

                const { status, message } = data
                
                if(status === false) {
                    throw new Error(message)
                } else {
                    addToast(message, { appearance: "success" })
                    router.push("/signup/thank-you")
                }

            }
        } catch(error) {
            addToast(error.message, { appearance: 'error' })
            setIsLoading(false)
        }

    }

    return (
        <div className="signup">
            <Head>
                <title>Safe plaze || Sign up</title>
            </Head>
            <form onSubmit={handleFormData} className="form form__signup">
                <div className="form__header">
                    <div className="form__img-container">
                        <Image src={logo} alt="logo" className="form__logo" placeholder="blur" />
                    </div>
                </div>
                <h1 className="form__title">Sign up</h1>
                <div className="form__main">
                    <div className="form__group form__group--user">
                        <input 
                            type="text" 
                            name="fullname"
                            className="form__input icon" 
                            placeholder="Full name..."  
                            value={formFields.fullname}
                            onChange={e => setFormFields({ ...formFields,  [e.target.name]: e.target.value})}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form__group form__group--email">
                        <input 
                            type="email" 
                            name="email"
                            className="form__input icon" 
                            placeholder="E-mail..."  
                            value={formFields.email}
                            onChange={e => setFormFields({ ...formFields,  [e.target.name]: e.target.value})}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form__group form__group--phone">
                        <input 
                            type="tel" 
                            name="phonenumber"
                            className="form__input icon" 
                            placeholder="Phonenumber..."  
                            value={formFields.phonenumber}
                            onChange={e => setFormFields({ ...formFields,  [e.target.name]: e.target.value})}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form__group form__group--password">
                        <input 
                            type={showPassword ? "text": "password"} 
                            name="password"
                            className="form__input icon" 
                            placeholder="Password..."  
                            value={formFields.password}
                            onChange={e => setFormFields({ ...formFields,  [e.target.name]: e.target.value})}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form__password-toggler">
                        <i onClick={() => setShowPassword(curr => !curr)} className={`fas fa-eye${showPassword ? "-slash": ""}`}></i>
                    </div>

                    <button className="form__action-btn" disabled={isLoading}>
                        {
                            isLoading ? (
                                <Loader type="ThreeDots" color="#4FC4F0" height={12} />
                            ) : (
                                <span>Sign up</span>
                            )
                        }
                    </button>
                </div>
                <p className="login-text">
                    <span>Already a customer? </span>
                    <Link href="/login">
                        <a className="login-link">Log in</a>
                    </Link>
                </p>
                <p className="return-text">
                    <Link href="/">
                        <a className="return-link">
                            <i className="fas fa-home"></i>
                            &nbsp;
                            <span>Home</span>
                        </a>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Signup