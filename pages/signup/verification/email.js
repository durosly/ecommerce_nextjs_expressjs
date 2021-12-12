import { useEffect, useState } from 'react'
import Head from 'next/head'
import FullPageSpinner from '../../../components/spinner/full-page-spinner'
import EmailVerificationSuccessful from '../../../components/verification/email-verification-success'
import EmailVerificationFailure from '../../../components/verification/email-verification-failure'

function EmailVerification({ email, token }) {
    const info = { email, token }
    const [status, setStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function loadData() {
            setIsLoading(true)

            try {

                const response = await fetch("/user/signup/verification", { method: "POST", body: JSON.stringify(info), headers: {"Content-Type": "application/json"} })
                const jsonData = await response.json()
                
                if(jsonData.status === true) {
                    setStatus(true)
                } else {
                    throw new Error("Validation failed.")
                }

            } catch(error) {
                setStatus(false)
            }
            setIsLoading(false)
        }

        loadData()
    }, [])    

    if(isLoading) return <FullPageSpinner />
    
    return (
        <>
            <Head>
                <title>Safe plaze || E-mail verification</title>
            </Head>
            <div className="verification">
                {
                    status ? (
                        <EmailVerificationSuccessful />
                    ) : (
                        <EmailVerificationFailure />
                    )
                }
            </div>
        </>
    )
}

export default EmailVerification

export async function getServerSideProps(context) {
    const { query } = context
    const { e, token } = query


    return {
        props: {
            email: e,
            token
        }
    }

}