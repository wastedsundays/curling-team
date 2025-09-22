import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/testimonial-styles.css';


const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}/data/testimonials.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                setTestimonials(data.testimonials);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTestimonials();
    }, []);

    if (!testimonials.length) {
        return <div>Loading...</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    }

    return (
            <div className='testimonial-block'>
                {testimonials.length > 0 ? ( 
                    <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <blockquote key={index}>
                            <p>"{testimonial.quote}"</p>
                            <cite>- {testimonial.author}</cite>
                        </blockquote>
                    ))}
                    </Slider>
                ) : <p>Loading Testimonials...</p>}


            </div>
    );
}

export default Testimonials