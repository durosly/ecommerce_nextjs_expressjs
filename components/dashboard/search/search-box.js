
function SearchBox() {
    return (
        <div className="search-box pull-left">
            <form action="#">
                <input type="text" name="search" placeholder="Search..." required />
                <i className="ti-search"></i>
            </form>
        </div>
    )
}

export default SearchBox