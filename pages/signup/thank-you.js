import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Loader from 'react-loader-spinner'
import { useToasts } from 'react-toast-notifications'
import verificationResend from '../../form-handlers/verification-resend'
import celebrationIllustration from '../../public/assets/images/illustrations/celebration.svg'

function ThankYou() {
    const [isLoading, setIsLoading] = useState(false)
    const { addToast } = useToasts()
    async function handleClick(e) {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await verificationResend()
            const data = await response.json()

            if(data.status){
                addToast("E-mail sent", { appearance: "success" })
                setIsLoading(false)
            } else {
                throw new Error("Something went wrong")
            }
        } catch(error) {
            addToast("Something went wrong. Please, try again", { appearance: "error" })
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="thank-you">
                <div className="thank-you__container">
                    <Image className="thank-you__logo" src={celebrationIllustration} />
                    <h2 className="thank-you__header">Thank you for signing up.</h2>
                    <p className="thank-you__text">Visit your inbox for verification link.</p>
                </div>
                <p className="thank-you__appreciation">
                    {
                        isLoading ? (
                            <span>
                                Sending...
                                <Loader type="TailSpin" color="#000" height={50} />
                            </span>
                            
                        ) : (
                            <span>Not recieved e-mail yet? <Link href="/resend"><a onClick={handleClick} className="thank-you__link">Re-send</a></Link></span>
                        )
                    }
                    
                </p>
            </div>
        </>
    )
}

export default ThankYou