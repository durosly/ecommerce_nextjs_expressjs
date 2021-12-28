import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import { useToasts } from 'react-toast-notifications'
import { setCategories, setSpecialCategories } from '../../features/dashboard/dashboardSlice'
import CategoryTable from '../../components/dashboard/category/category-table'
import CategoryUpload from '../../components/dashboard/category/category-upload-form'
import DashboardLayout from '../../components/dashboard/layout/dashboard-layout'

function Categories() {
    const dispatch = useDispatch()
    const { addToast } = useToasts()
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [spcialCategoryLoading, setSpecialCategoryLoading] = useState(false)

    // load regular categories
    useEffect(() => {
        async function loadCategories() {
            try {
                setCategoryLoading(true)
                const response = await fetch("/admin/category")
                const data = await response.json()

                if(data.status) {
                   dispatch(setCategories(data.categories))
                   setCategoryLoading(false)
                } else {
                    throw new Error("Something went wrong")
                }

            } catch(error) {
                setCategoryLoading(false)
                addToast(error.message, { appearance: "error" })
            }
        }

        loadCategories()
    }, [])

    // load special categories
    useEffect(() => {
        async function loadSpecialCategories() {
            try {
                setSpecialCategoryLoading(true)
                const response = await fetch("/admin/special-category")
                const data = await response.json()

                if(data.status) {
                   dispatch(setSpecialCategories(data.categories))
                   setSpecialCategoryLoading(false)
                } else {
                    throw new Error("Something went wrong")
                }

            } catch(error) {
                setSpecialCategoryLoading(false)
                addToast(error.message, { appearance: "error" })
            }
        }

        loadSpecialCategories()
    }, [])

    return (
        <DashboardLayout>
            <Head>
                <title>Categories - Safe plaze</title>
            </Head>
            <CategoryTable categoryLoading={categoryLoading} spcialCategoryLoading={spcialCategoryLoading} />
            <CategoryUpload />
        </DashboardLayout>          
    )
}

export default Categories

export const getServerSideProps = withIronSession(
    async ({ req, res }) => {
        const admin = req.session.get("admin")

        if(!admin) {
            return {
                redirect: {
                    destination: '/admin',
                    permanent: false,
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