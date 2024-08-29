import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import '../../index.scss';

function Carousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timeOutRef = useRef(null);

  const slideRight = useCallback(() => {
    setCurrent((prevCurrent) => (prevCurrent === images.length - 1 ? 0 : prevCurrent + 1));
  }, [images.length]);

  useEffect(() => {
    if (autoPlay) {
      timeOutRef.current = setTimeout(() => {
        slideRight();
      }, 2000);
    }

    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, [current, autoPlay, slideRight]);

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div className="carousel" onMouseEnter={() => {
        setAutoPlay(false);
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className="carousel_wrapper">{images.map((image, index) => (
        <div key={index} className={index === current ? 'carousel_card carousel_card-active' : 'carousel_card'}>
            <img className="card_image" src={image.image} alt={image.title} />
            <div className="card_overlay">
              <div className="card_text">
                <h2 className="card_title">{image.title}</h2>
                <Link to={image.link} className="pl-1 text-sm">+MÁS INFO</Link>
              </div>
            </div>
          </div>
        ))}
        <div className="carousel_arrow_left" onClick={slideLeft}><IoIosArrowBack /></div>
        <div className="carousel_arrow_right" onClick={slideRight}><IoIosArrowForward /></div>
        <div className="carousel_pagination">
          {images.map((_, index) => (
            <div key={index} className={index === current ? 'pagination_dot pagination_dot-active' : 'pagination_dot'} onClick={() => setCurrent(index)}>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
