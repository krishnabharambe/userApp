import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

let count = 0;
let slideInterval;
export default function Slider1({ data2 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredProducts, SetSliderImg] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  let images = [];

  useEffect(() => {
    // slideRef.current.addEventListener('animationend', removeAnimation);
    // slideRef.current.addEventListener('mouseenter', pauseSlider);
    // slideRef.current.addEventListener('mouseleave', startSlider);
    SetSliderImg(data2);

    startSlider();

    return () => {
      pauseSlider();
    };
  }, [data2]);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };
  const handleOnPrevClick = () => {
    const productsLength = featuredProducts.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add('fade-anim');
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      ref={slideRef}
      className="w-full select-none max-w-7xl mx-auto relative"
    >
      <div className="aspect-w-16 aspect-h-6 md:aspect-h-7 ">
        <img
          src={
            'https://krishnabharambe.pythonanywhere.com/' +
            featuredProducts[currentIndex]
          }
          alt=""
        />
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnPrevClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnNextClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
