import React, { useState, useEffect, useRef, useCallback } from 'react';
import image1 from './resbg1.webp';
import image2 from './resbg2.png';
import image3 from './resbg3.png';

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesRef = useRef([]);

  const changeSlide = (n) => {
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + n;

      if (newIndex > slidesRef.current.length) {
        newIndex = 1;
      }

      if (newIndex < 1) {
        newIndex = slidesRef.current.length;
      }

      return newIndex;
    });
  };

  const showSlides = useCallback(() => {
    const slides = slidesRef.current;

    for (let i = 0; i < slides.length; i++) {
      slides[i]?.style && (slides[i].style.display = 'none');
    }

    slides[slideIndex - 1]?.style && (slides[slideIndex - 1].style.display = 'block');
  }, [slideIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex % slidesRef.current.length) + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    showSlides();
  }, [slideIndex, showSlides]);

  return (
    <div className="slideshow-container">
      <div className="mySlides fade" ref={(el) => (slidesRef.current[0] = el)}>
        <img src={image1} style={{ width: '100%' }} alt="Nature" />
      </div>

      <div className="mySlides fade" ref={(el) => (slidesRef.current[1] = el)}>
        <img src={image2} style={{ width: '100%' }} alt="Snow" />
      </div>

      <div className="mySlides fade" ref={(el) => (slidesRef.current[2] = el)}>
        <img src={image3} style={{ width: '100%' }} alt="Mountains" />
      </div>

      <div className="prev" onClick={() => changeSlide(-1)}>
        ❮
      </div>
      <div className="next" onClick={() => changeSlide(1)}>
        ❯
      </div>
    </div>
  );
};

export default Slideshow;
