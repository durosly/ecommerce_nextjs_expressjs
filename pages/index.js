import { useEffect } from 'react'
import Head from 'next/head'
import { withIronSession } from 'next-iron-session'
import { useDispatch } from 'react-redux'
import config from 'config'
import { setUser } from '../features/user/userSlice'
import UserLayout from '../components/userLayout'
import Category from '../components/category-list/category'
import Carousel from '../components/carousel/carousel'
import ProductList from '../components/product-list/product-list'

function Home({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })


    return (
        <UserLayout>
            <Head>
                <title>Safe plaze || home</title>
            </Head>
           
            <section className="container">
                <div className="category-slide-container">
                    <Category />
                    <Carousel />
                </div>
                <ProductList />
            </section>
        </UserLayout>
    )
}

export default Home

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
            props: { }
        }

    }, {
        cookieName: config.get("cookie.name"),
        password: config.get("cookie.password")
    }
)
