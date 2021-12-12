import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import logo from '../public/assets/images/logo/logo-top-transparent.png'
import loginHandler from '../form-handlers/login'

const initial = {
    email: '',
    password: ''
}

function Login() {
    const router = useRouter()
    const { addToast } = useToasts()
    const [isLoading, setIsLoading] = useState(false)
    const [fields, setFields] = useState(initial)

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await loginHandler(fields)
            const data = await response.json()

            if(data.status) {
                addToast(data.message, { appearance: "success" })
                router.push("/")
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
            <div className="login">
                <Head>
                    <title>Safe plaze || Log in</title>
                </Head>
                <form onSubmit={handleSubmit} className="form form__login">
                    <div className="form__header">
                        <div className="form__img-container">
                            <Image src={logo} alt="logo" className="form__logo" placeholder="blur" />
                        </div>
                    </div>
                    <h1 className="form__title">Log in</h1>
                    <div className="form__main">
                        <div className="form__group form__group--email">
                            <input 
                                type="email" 
                                name="email"
                                className="form__input icon" 
                                placeholder="E-mail..." 
                                required
                                value={fields.email} 
                                onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form__group form__group--password">
                            <input 
                                type="password" 
                                name="password"
                                className="form__input icon" 
                                placeholder="Password..." 
                                required 
                                value={fields.password} 
                                onChange={e => setFields({...fields, [e.target.name]: e.target.value})}
                                disabled={isLoading}
                            />
                        </div>
                        <button disabled={isLoading} className="form__action-btn">
                            {
                                isLoading ? (
                                    <Loader type="ThreeDots" color="#4FC4F0" height={12} />
                                ) : (
                                    <span>Log in</span>
                                )
                            }
                        </button>
                    </div>
                    <Link href="/forgot-password">
                        <a className="forget-password">Forgot password?</a>
                    </Link>
                    <p className="signup-text">
                        <span>New here? </span>
                        <Link href="/signup">
                            <a className="signup-link">Sign up</a>
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
        </>
    )

}

export default Login

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user")

        if(user) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        return {
            props: { }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)