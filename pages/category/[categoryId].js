import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from 'react-loader-spinner'
import ProductCategoryItem from '../../components/product-category/product-category-item'
import UserLayout from '../../components/userLayout'

const fetcher = (url) => fetch(url).then(res => res.json())

function Category({ user }) {

    const dispatch = useDispatch()
    const router = useRouter()
    const { categoryId } = router.query

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })

    const { data, error } = useSWR(`/user/products/category/${categoryId}`, fetcher)
    const { status, message, products, category} = data || {}
    
    return (
        <UserLayout>
            <Head>
                <title>Safe Plaze || product category { status && ` || ${ category.name } || ${ category.desc }` }</title>
            </Head>

            <section className="container">
                <div className="product-category">
                    {
                        error ? (
                            <p style={{ color: "red"}}>{ error.message }</p>
                        ) : (
                            data ? (
                                status ? (
                                    <>
                                        <h2 className="product-category__title">{ category.name }</h2>
                                        <ul className="product-category__list">
                                            {
                                                products.length > 0 && products.map(p => <ProductCategoryItem key={p.id} product={p} />)
                                            }
                                        </ul>
                                    </>
                                ) : (
                                    <p style={{ color: "red"}}>{ message }</p>
                                )
                            ) : (
                                <>
                                    Loading...
                                    <Loader type="TailSpin" color="#000" width={16} height={16} />
                                </>
                            )
                        )
                    }
                </div>   

            </section>
        </UserLayout>
    )
}

export default Category

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