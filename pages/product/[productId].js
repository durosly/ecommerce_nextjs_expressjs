import { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { withIronSession } from 'next-iron-session'
import config from 'config'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from 'react-loader-spinner'
import UserLayout from '../../components/userLayout'
import ProductDisplay from '../../components/product-details/product-display'
import { setUser } from '../../features/user/userSlice'

const fetcher = (url) => fetch(url).then(res => res.json())

function ProductDetailsPage({ user }) {

    const dispatch = useDispatch()

    const router = useRouter()
    const { productId } = router.query

    useEffect(() => {
        if(user) {
            dispatch(setUser(user))
        }
    })

    const { data, error } = useSWR(`/user/product/${productId}`, fetcher)
    const { status, message, product, category} = data || {}

    return (
        <UserLayout>
            <Head>
                <title>Safe Plaze || product details { status && ` || ${product.desc}` }</title>
            </Head>

            <main className="container">
                {
                    error && !data ? (
                        <p style={{ color: "red"}}>{ error.message }</p>
                    ) : (
                        data ? (
                            status ? (

                                <>
                                    <ProductDisplay product={product} />
                                    <section className="product-description">
                                        <h2 className="product-description__title">Product details</h2>
                                        <div className="product-description__content">
                                            <ul className="product-description__list">
                                                <li>100% cotton</li>
                                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, obcaecati.</li>
                                                <li>Best linel material</li>
                                                <li>Can be washed with washing machine</li>
                                                <li>Handles bleach properly. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde, voluptate.</li>
                                                <li>Consistent colour design. Lorem ipsum dolor sit amet.</li>
                                                <li>Fast delivery in Warri</li>
                                                <li>Nice to meet you</li>
                                                <li>Black</li>
                                                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsum veniam, doloremque maiores tempora blanditiis? Odit, repudiandae sequi. Ea laudantium doloremque suscipit dolorum dignissimos laborum enim fugit ipsam ex? Eos.</li>
                                            </ul>
                                        </div>
                                    </section>
                                    <section className="product-specification">
                                        <h2 className="product-specification__title">Technical details</h2>
                                        <ul className="product-specification__list">
                                            <li className="product-specification__list-item">
                                                <span className="product-specification__list-item-title">Size</span>
                                                <span className="product-specification__list-item-desc">29</span>
                                            </li>
                                            <li className="product-specification__list-item">
                                                <span className="product-specification__list-item-title">Manufacturer</span>
                                                <span className="product-specification__list-item-desc">Gucci</span>
                                            </li>
                                            <li className="product-specification__list-item">
                                                <span className="product-specification__list-item-title">Warranty</span>
                                                <span className="product-specification__list-item-desc">2 years</span>
                                            </li>
                                            <li className="product-specification__list-item">
                                                <span className="product-specification__list-item-title">Nice</span>
                                                <span className="product-specification__list-item-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatibus et sunt optio quod, laboriosam ab magnam explicabo eos iusto id, delectus earum rem. Aliquam, ipsam vitae! Odio, deserunt quaerat?</span>
                                            </li>
                                        </ul>
                                    </section>
                                    <section className="product-review">
                                        <h2 className="product-review__title">Customer reviews</h2>
                                        <div className="product-review__container">
                                            <div className="product-review__rating">
                                                <div className="product-review__rating-count">
                                                    <span className="product-review__rating--average">4.5</span>
                                                    <div className="product-review__rating--stars">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half"></i> 
                                                    </div>
                                                    <span className="product-review__rating--total">6.1K</span>
                                                </div>
                                                <div className="product-review__rating-chart">
                                                    <div className="product-review__rating-column">
                                                        <span className="product-review__rating-column--type">5</span>
                                                        <div className="product-review__rating-column--chart">
                                                            <div className="inner inner-5"></div>
                                                        </div>
                                                        <span className="product-review__rating-column--percent">75%</span>
                                                        <span className="product-review__rating-column--count">786</span>
                                                    </div>
                                                    <div className="product-review__rating-column">
                                                        <span className="product-review__rating-column--type">4</span>
                                                        <div className="product-review__rating-column--chart">
                                                            <div className="inner inner-4"></div>
                                                        </div>
                                                        <span className="product-review__rating-column--percent">25%</span>
                                                        <span className="product-review__rating-column--count">86</span>
                                                    </div>
                                                    <div className="product-review__rating-column">
                                                        <span className="product-review__rating-column--type">3</span>
                                                        <div className="product-review__rating-column--chart">
                                                            <div className="inner inner-3"></div>
                                                        </div>
                                                        <span className="product-review__rating-column--percent">15%</span>
                                                        <span className="product-review__rating-column--count">26</span>
                                                    </div>
                                                    <div className="product-review__rating-column">
                                                        <span className="product-review__rating-column--type">2</span>
                                                        <div className="product-review__rating-column--chart">
                                                            <div className="inner inner-2"></div>
                                                        </div>
                                                        <span className="product-review__rating-column--percent">5%</span>
                                                        <span className="product-review__rating-column--count">26</span>
                                                    </div>
                                                    <div className="product-review__rating-column">
                                                        <span className="product-review__rating-column--type">1</span>
                                                        <div className="product-review__rating-column--chart">
                                                            <div className="inner inner-1"></div>
                                                        </div>
                                                        <span className="product-review__rating-column--percent">2%</span>
                                                        <span className="product-review__rating-column--count">6</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-review__comments">
                                                <div className="product-review__comment">
                                                    <div className="product-review__top">
                                                        <img src="/uploads/profile/profile-default.png" alt="profile" className="product-review__top--image" />
                                                        <span className="product-review__top--name">John Carter</span>
                                                    </div>
                                                    <div className="product-review__mid">
                                                        <div className="product-review__mid--stars">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                        </div>
                                                        <h3 className="product-review__mid--title">Best of them</h3>
                                                    </div>
                                                    <div className="product-review__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum, perferendis quisquam doloribus dolores necessitatibus quae aliquid ad cumque deleniti voluptas quo quasi cum. Distinctio ut nemo fugiat explicabo quo?</div>
                                                    <span className="product-review__date">4 days ago</span>
                                                </div>
                                                <div className="product-review__comment">
                                                    <div className="product-review__top">
                                                        <img src="/uploads/profile/profile-1.jpg" alt="profile" className="product-review__top--image" />
                                                        <span className="product-review__top--name">Mary Doe</span>
                                                    </div>
                                                    <div className="product-review__mid">
                                                        <div className="product-review__mid--stars">
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                            <i className="fas fa-star"></i>
                                                        </div>
                                                        <h3 className="product-review__mid--title">Seems alright</h3>
                                                    </div>
                                                    <div className="product-review__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorum, perferendis quisquam doloribus dolores necessitatibus quae aliquid ad cumque deleniti voluptas quo quasi cum. Distinctio ut nemo fugiat explicabo quo?</div>
                                                    <span className="product-review__date">2 weeks ago</span>
                                                    <div className="product-review__reply">
                                                        <h3 className="product-review__reply--title"><i className="fas fa-reply product-review__reply--icon"></i>Vendor</h3>
                                                        <div className="product-review__reply--desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, totam. Autem ipsum nostrum quod porro mollitia aspernatur doloribus ut laboriosam!</div>
                                                        <span className="product-review__reply--time">2 weeks ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#/product-reviews/current" className="product-review__more-btn">See more &rarr;</a>
                                    </section>
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
            </main>
        </UserLayout>
    )
}

export default ProductDetailsPage

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