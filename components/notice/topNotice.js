import Marquee from 'react-fast-marquee'

function TopNotice() {
    return (
        <div className="top-info">
            <Marquee className="top-info__text" speed={50}>You can contact us on 07063069903</Marquee>
        </div>
    )
}

export default TopNotice
