import { useDispatch } from 'react-redux'
import { hideMenu } from '../../features/menu/menuSlice'

function Dropdown() {
    const dispatch = useDispatch()
    return (
        <div className="header__dropdown">
            <span className="header__dropdown--close-btn" onClick={() => dispatch(hideMenu())}>
                <i className="fas fa-times"></i>
            </span>
            <div className="header__dropdown-item">
                <h3 className="header__dropdown-item-title">Account</h3>
                <ul className="header__dropdown-list">
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Orders</a></li>
                    <li><a href="#">Cart</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Log out</a></li>
                </ul>
            </div>
            <div className="header__dropdown-item header__dropdown-item--mobile">
                <h3 className="header__dropdown-item-title">Category</h3>
                <ul className="header__dropdown-list">
                    <li><a href="#">Men's wear</a></li>
                    <li><a href="#">Women's wears</a></li>
                    <li><a href="#">Baby's special</a></li>
                    <li><a href="#">Electronics</a></li>
                    <li><a href="#">Computers &amp; accessories</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown
