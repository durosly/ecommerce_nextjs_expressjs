import Image from 'next/image'
import Loader from 'react-loader-spinner'
import logo from '../../public/assets/images/logo/full-transparent.png'

function FullPageSpinner() {
    return (
        <div className="spinner full-page">
            <div className="spinner__card">
                <Image className="spinner__card--image" src={logo} placeholder="blur" />
                <Loader type="Rings" color="#1196c8" width={100} height={100} />
                <div className="spinner__card--loading-text">Loading...</div>
            </div>
        </div>
    )
}

export default FullPageSpinner