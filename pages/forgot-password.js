import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import logo from '../public/assets/images/logo/logo-top-transparent.png'

function ForgetPassword() {
    return (
        <div className="signup">
            <Head>
                <title>Safe plaze || forgot password</title>
            </Head>
            <form className="form form__signup">
                <div className="form__header">
                    <div className="form__img-container">
                        <Image src={logo} alt="logo" className="form__logo" placeholder="blur" />
                    </div>
                </div>
                <h1 className="form__title">Forgot password</h1>
                <div className="form__main">
                    <div className="form__group form__group--email">
                        <input type="email" className="form__input icon" placeholder="E-mail..." required />
                    </div>
                    <button className="form__action-btn">Send E-mail</button>
                </div>
                <p className="login-text">
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

export default ForgetPassword