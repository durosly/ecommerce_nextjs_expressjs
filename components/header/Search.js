import { useState } from 'react'

function Search({ mobile }) {
    const [search, setSearch] = useState("")

    function handleSearch(e) {
        e.preventDefault()

        console.log(`Searching for ${search} now...`)
    }
    return (
        <form action="/search" className="header__search-form" onSubmit={handleSearch} style={mobile ? searchStyle: {}}>
            <input 
                className="header__search-input" 
                type="search" 
                name="search" 
                id="search" 
                placeholder="product, category, etc..." 
                autoComplete="off"
                autoCorrect="off"
                value={search}
                onChange={ e => setSearch(e.target.value) }
            />
            <button className="header__search-btn">
                <span className="text">search</span>
                <span className="icon">
                    <i className="fas fa-search"></i>
                </span>
            </button>
        </form>
    )
}

const searchStyle = {
    display: "flex"
}

export default Search
