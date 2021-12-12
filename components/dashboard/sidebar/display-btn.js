import { useDispatch } from 'react-redux'
import { toggleNav } from '../../../features/dashboard/dashboardSlice'

function DisplayBtn() {
    const dispatch = useDispatch()
    return (
        <div onClick={() => dispatch(toggleNav())} className="nav-btn pull-left">
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default DisplayBtn