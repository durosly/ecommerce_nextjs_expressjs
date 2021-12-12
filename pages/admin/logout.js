import { withIronSession } from 'next-iron-session'
import config from 'config'

function AdminLogout() {
    return null
}

export default AdminLogout

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        req.session.destroy()

      
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)