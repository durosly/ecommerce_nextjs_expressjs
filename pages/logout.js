import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import { clearUser } from '../features/user/userSlice'
import { clearCart } from '../features/cart/cartSlice'

function UserLogout() {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        router.push("/login")
        
        return () => {
            dispatch(clearUser())
            dispatch(clearCart())
        }
    }, [])

    return null
}

export default UserLogout

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        req.session.destroy()

      
        return {
            props: {

            }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)