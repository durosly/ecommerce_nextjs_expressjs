import { useEffect } from 'react'
import Head from 'next/head'
import config from 'config'
import { withIronSession } from 'next-iron-session'
import { useDispatch } from 'react-redux'
import UserLayout from '../components/userLayout'
import { setUser } from '../features/user/userSlice'
import ProfileForm from '../components/profile/profile-form'

function Profile({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })
    return (
        <UserLayout>
            <Head>
                <title>Safe plaze || Profile page</title>
            </Head>
            <main className="container">
                <section className="profile">
                    <h2 className="profile__title">Edit Profile</h2>
                    <ProfileForm />
                </section>
            </main>
           
            
        </UserLayout>
    )
}

export default Profile

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get("user")

        if(user) {
            return {
                props: {
                    user
                }
            }
        }

        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)