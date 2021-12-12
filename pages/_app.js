import Head from "next/head"
import Router from "next/router"
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
import ProgressBar from "@badrap/bar-of-progress"
import store from "../app/store"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import '../sass/main.scss'
import '../public/assets/vendor/fontawesome/css/all.min.css'

const progress = new ProgressBar({
    size: 2,
    color: "#4FC4F0",
    className: "bar-of-progress",
    delay: 100,
})

Router.events.on("routeChangeStart", progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/fav/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/fav/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/fav/favicon-16x16.png" />
                <link rel="manifest" href="/assets/fav/site.webmanifest" />
                <title>Safe plaze || best ecommerce crypto website for buying and selling of products and crypto currencies.</title>
            </Head>
            <Provider store={store} >
                <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
                    <Component {...pageProps} />
                </ToastProvider>
            </Provider>
        </>
    )
}