import { withIronSession } from 'next-iron-session'
import config from 'config'

function UserLogout() {
    return null
}

export default UserLogout

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        req.session.destroy()

      
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