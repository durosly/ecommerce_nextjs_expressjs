import Image from 'next/image'
import Link from 'next/link'
import confirmLogo from '../../public/assets/images/svg/confirm_icon.svg'

function EmailVerificationSuccessful() {
    return (
        <>
            <div className="verification__container">
                <Image className="verification__logo" src={confirmLogo} />
                <h2 className="verification__header">E-mail verification successful</h2>
                <Link href="/login">
                    <a className="verification__link">Log in</a>
                </Link>
            </div>
            <p className="verification__appreciation">
                Thank you for joining us. We hope you enjoy shopping with us. Log in to get full experience.
            </p>
        </>
    )
}

export default EmailVerificationSuccessful