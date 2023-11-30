'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"

const Banner = () => {
  return (
    <div className='relative ' >
    <div className='absolute h-36 
    ' />
    <Carousel
     autoPlay
     infiniteLoop
     showStatus ={false}
     showIndicators={false}
     showThumbs={false}
     interval ={2000}
    >
        <div className="image-slider-container">
        <img loading ='lazy' src='/Hero_one.jpg' alt='' className="image-slider"/>
        </div>
        <div>
        <img loading ='lazy' src='/Hero-Two.jpg' alt='' />
        </div>   
    </Carousel>
</div>
  )
}

export default Banner
