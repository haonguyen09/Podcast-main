import React from 'react'
import PlayIcon from '../../asset/icons/PlayIcon'
import man from '../../asset/images/banner.png'
import circle from '../../asset/images/img-circle.png'
import vector from '../../asset/images/img-vector.png'
import Slider from "react-slick";

const Trending = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className='trending'>
            <h2 className='heading trending-heading text-start'>Trending</h2>
            <Slider {...settings}>
                <div className='trending-banner d-flex align-items-start'>
                    <div className='trending-content text-start'>
                        <h3 className='trending-title'><span>UX Design</span> Process: Mental Modeling Framework.</h3>
                        <p className='trending-podcast'>Podcast Episode - 1</p>
                        <p className='trending-author'>Thomas L. Fletcher<span className='trending-author-position'>(Product Design at UIHUT)</span></p>
                        <button className='button button--primary'>
                            <PlayIcon />
                            <span>Play now</span>
                        </button>
                    </div>
                    <img srcSet={circle} className='trending-circle'  alt='circle' />
                    <img srcSet={vector} className='trending-vector' alt='vector'/>
                    <div className='trending-image'>
                        <img src={ man } alt='man'/>
                    </div>
                </div>
                <div className='trending-banner d-flex align-items-start'>
                    <div className='trending-content text-start'>
                        <h3 className='trending-title'><span>UX Design</span> Process: Mental Modeling Framework.</h3>
                        <p className='trending-podcast'>Podcast Episode - 1</p>
                        <p className='trending-author'>Thomas L. Fletcher<span className='trending-author-position'>(Product Design at UIHUT)</span></p>
                        <button className='button button--primary'>
                            <PlayIcon />
                            <span>Play now</span>
                        </button>
                    </div>
                    <img srcSet={circle} className='trending-circle'  alt='circle' />
                    <img srcSet={vector} className='trending-vector' alt='vector'/>
                    <div className='trending-image'>
                        <img src={ man } alt='man'/>
                    </div>
                </div>
                <div className='trending-banner d-flex align-items-start'>
                    <div className='trending-content text-start'>
                        <h3 className='trending-title'><span>UX Design</span> Process: Mental Modeling Framework.</h3>
                        <p className='trending-podcast'>Podcast Episode - 1</p>
                        <p className='trending-author'>Thomas L. Fletcher<span className='trending-author-position'>(Product Design at UIHUT)</span></p>
                        <button className='button button--primary'>
                            <PlayIcon />
                            <span>Play now</span>
                        </button>
                    </div>
                    <img srcSet={circle} className='trending-circle'  alt='circle' />
                    <img srcSet={vector} className='trending-vector' alt='vector'/>
                    <div className='trending-image'>
                        <img src={ man } alt='man'/>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default Trending