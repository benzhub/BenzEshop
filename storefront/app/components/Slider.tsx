"use client";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { slides } from "../data/sliders";

function Slider({ title }: { title: ReactNode }) {
  const [currSlideNum, setCurrSlideNum] = useState(0);
  const maxSlide = slides.length;

  const slidesEl = slides.map((slide, idx) => (
    <SlideItem
      key={slide.id}
      title={slide.title}
      thumb={slide.thumb}
      idx={idx}
      currSlideNum={currSlideNum}
    />
  ));

  function prevSlide() {
    if (currSlideNum === 0) {
      setCurrSlideNum(maxSlide - 1);
    } else {
      setCurrSlideNum((cur) => cur - 1);
    }
  }

  function nextSlide() {
    if (currSlideNum === maxSlide - 1) {
      setCurrSlideNum(0);
    } else {
      setCurrSlideNum((cur) => cur + 1);
    }
  }

  return (
    <div className="p-4">
      <div className="relative w-full overflow-hidden sm:m-auto">
        <h2 className="py-4 text-3xl font-bold">{title}</h2>
        <div className="h-[30rem]">{slidesEl}</div>
        <button onClick={prevSlide} className="slider-btn cursor-pointer">
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="slider-btn right-0 cursor-pointer"
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}

interface SlideItemProps {
  title: string;
  thumb: string;
  idx: number;
  currSlideNum: number;
}

function SlideItem({ title, thumb, idx, currSlideNum }: SlideItemProps) {
  const size = useWindowSize();
  const imageSize = useRef(150);
  useEffect(() => {
    if (!size.width) return;
    if (size.width >= 330) imageSize.current = 200;
    if (size.width >= 600) imageSize.current = 250;
    if (size.width >= 1024) imageSize.current = 300;
  }, [size.width]);
  return (
    <div
      className={`slide translate-x-[${(idx - currSlideNum) * 100}%] overflow-hidden`}
    >
      <div className="m-auto flex h-full flex-col items-center justify-center gap-4 md:w-[80%] lg:w-[65%]">
        <Image
          width={imageSize.current}
          height={imageSize.current}
          src={thumb}
          alt={`Slide Image ${title}`}
        />
        <h3 className="text-center font-black md:text-2xl lg:text-4xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default Slider;
