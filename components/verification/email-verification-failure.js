import Image from 'next/image'
import Link from 'next/link'
import confirmLogo from '../../public/assets/images/svg/failure_icon.svg'

const logoSize = 200

function EmailVerificationFailure() {
    return (
        <>
            <div className="verification__container">
                <Image className="verification__logo" src={confirmLogo} width={logoSize} height={logoSize} />
                <h2 className="verification__header">E-mail verification failed</h2>
                <Link href="/">
                    <a className="verification__link">Contact Admin</a>
                </Link>
            </div>
            <p className="verification__appreciation">
                An error occured while trying to verify this user. Please, contact admin for verification.
            </p>
        </>
    )
}

export default EmailVerificationFailure