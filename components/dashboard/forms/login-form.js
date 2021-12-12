import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import loginHandler from '../../../form-handlers/admin/login'

const initialState = {
    username: "",
    password: ""
}

function LoginForm() {
    const router = useRouter()
    const { addToast } = useToasts()
    const [fields, setFields] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await loginHandler(fields)
            const data = await response.json()

            if(data.status) {
                addToast(data.message, { appearance: "success" })
                router.push("/admin/dashboard")
            } else {
                throw new Error(data.message)
            }

        } catch(error) {
            addToast(error.message, { appearance: "error" })
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="login-form-head">
                <h4>Sign In</h4>
                <p>Hello there, Sign in and start managing your Admin Template</p>
            </div>
            <div className="login-form-body">
                <div className="form-gp">
                    <input 
                        type="text" 
                        name="username"
                        id="exampleInputEmail1" 
                        placeholder="Username..." 
                        value={fields.username}
                        onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                        disabled={isLoading}
                    />
                    <i className="ti-user"></i>
                </div>
                <div className="form-gp">
                    <input 
                        type="password" 
                        name="password"
                        id="exampleInputPassword1" 
                        placeholder="Password..." 
                        value={fields.password}
                        onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                        disabled={isLoading}
                    />
                    <i className="ti-lock"></i>
                </div>
                <div className="submit-btn-area">
                    <button id="form_submit" type="submit">
                        {
                            isLoading ? (
                                <Loader type="ThreeDots" color="#000000" height={16} />
                            ) : (
                                <>
                                    Log in <i className="ti-arrow-right"></i>
                                </>
                            )
                        }
                    </button>
                </div>
                <Link href="/">
                    <a className="btn btn-primary rounded mt-4 d-block">Continue shopping</a>
                </Link>
            </div>
        </form>
    )
}

export default LoginForm