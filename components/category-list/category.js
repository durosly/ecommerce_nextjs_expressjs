import Link from 'next/link'
import useSWR from 'swr'
import Loader from 'react-loader-spinner'

const fetcher = url => fetch(url).then(res => res.json())
function Category() {
    const { data, error } = useSWR("/user/categories", fetcher)
    const { categories, status } = data || {}
    return (
        <div className="category">
            <ul className="category__list">
                {
                    error ? (
                        <li  className="category__list-item">
                            <span style={{color: "red"}}>{ error.message }</span>
                        </li>
                    ) : (
                        data ? (
                            status ? (
                                categories.length > 0 && categories.map(c => (
                                    <li key={c.id} className="category__list-item">
                                        <Link href={`/category/${c.id}`}>
                                            <a className="category__list-item--link">{ c.name }</a>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li  className="category__list-item">
                                    <span style={{color: "red"}}>{ error.message }</span>
                                </li>
                            )
                        ) : (
                            <li  className="category__list-item">
                                <span>
                                    Loading...
                                    <Loader type="TailSpin" color="#000" />
                                </span>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default Category
