import Image from 'next/image'

function Carousel() {
    return (
        <div className="carousel home">

            <div className="carousel__image-container">
                <Image className="carousel__image" src="/uploads/carousel/deepain-jindal-NUoPWImmjCU-unsplash.jpg" height={430} width={800} layout="intrinsic" alt="shoe" />
            </div> 
            <div className="carousel__indicators">
                <span className="carousel__indicators-dot"></span>
                <span className="carousel__indicators-dot carousel__indicators-dot--active"></span>
                <span className="carousel__indicators-dot"></span>
                <span className="carousel__indicators-dot"></span>
                <span className="carousel__indicators-dot"></span>
                <span className="carousel__indicators-dot"></span>
            </div>
        </div>
    )
}

export default Carousel
