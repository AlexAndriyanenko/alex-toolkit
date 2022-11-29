import React, { useMemo, useRef, useState, memo } from "react";

import { Nullable } from "models";
import { useDidMount, useDidUpdate } from "hooks";
import { applyCSSToNode, clsx } from "utils";
import { CarouselSlideType, CarouselDirectionsKeys } from "./carousel.types";

import styles from "./carousel.module.css";
import { ReactComponent as AngleDownSVG } from "assets/images/angle-down-grey.svg";

export interface CarouselProps {
  slides: CarouselSlideType[];
  initialSlide?: CarouselSlideType["id"];
  direction?: CarouselDirectionsKeys;
  containerClassName?: string;
  viewportClassName?: string;
  listClasName?: string;
  arrowClassName?: string;
  prevClassName?: string;
  nextClassName?: string;
  slideSize?: [width: number, height: number];
  slidesGap?: number;
  animationTime?: number;
  showArrows?: boolean;
}

export const Carousel = memo<CarouselProps>(
  ({
    slides,
    initialSlide,
    direction = "horizontal",
    containerClassName,
    viewportClassName,
    listClasName,
    arrowClassName = "",
    prevClassName = "",
    nextClassName = "",
    slideSize = [400, 400],
    slidesGap = 40,
    animationTime = 0.5,
    showArrows = true,
  }: CarouselProps) => {
    const listRef = useRef<HTMLDivElement>(null);
    const prevXRef = useRef(0);
    const prevYRef = useRef(0);

    const [width, height] = slideSize;
    const ids = useMemo(() => {
      return slides.map(({ id }) => id);
    }, []);

    const [current, setCurrent] = useState<Nullable<string>>(null);

    useDidMount(() => {
      if (!slides.length) return;

      if (initialSlide) {
        setCurrent(initialSlide);
      } else {
        setCurrent(slides[0].id);
      }
    });

    useDidUpdate(() => {
      const listElement = listRef.current;
      if (!listElement) return;

      const currentSlideIndex = slides.findIndex(({ id }) => id === current);
      if (currentSlideIndex === -1) return;

      const pixelsInSlide = width + slidesGap;
      const pixelsToMove = pixelsInSlide * -currentSlideIndex;

      applyCSSToNode(listElement, {
        transform:
          direction === "horizontal"
            ? `translateX(${pixelsToMove}px)`
            : `translateY(${pixelsToMove}px)`,
        transition: `transform ${animationTime}s`,
      });
    }, [current]);

    const handlePrev = () => {
      const currentIndex = ids.findIndex((id) => id === current);
      if (currentIndex === -1 || currentIndex === 0) return;

      const prevIndex = currentIndex - 1;
      setCurrent(ids[prevIndex]);
    };

    const handleNext = () => {
      const lastIndex = ids.length - 1;
      const currentIndex = ids.findIndex((id) => id === current);
      if (currentIndex === -1 || currentIndex === lastIndex) return;

      const nextIndex = currentIndex + 1;
      setCurrent(ids[nextIndex]);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      const listElement = listRef.current;
      const { clientX, clientY } = e;

      if (!listElement) return;

      if (direction === "horizontal") prevXRef.current = clientX;
      if (direction === "vertical") prevYRef.current = clientY;

      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      const listElement = listRef.current;
      const { clientX, clientY } = e.changedTouches[0];

      if (!listElement) return;

      if (direction === "horizontal") prevXRef.current = clientX;
      if (direction === "vertical") prevYRef.current = clientY;

      window.addEventListener("touchend", handleTouchEnd);
    };

    const handleMouseUp = (e: MouseEvent) => {
      const listElement = listRef.current;
      const { clientX, clientY } = e;

      if (!listElement) return;

      handleSwipe(clientX, clientY);

      window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const listElement = listRef.current;
      const { clientX, clientY } = e.changedTouches[0];

      if (!listElement) return;

      handleSwipe(clientX, clientY);

      window.removeEventListener("touchend", handleTouchEnd);
    };

    const handleSwipe = (clientX: number, clientY: number) => {
      let isPrev = false;

      if (direction === "horizontal") {
        if (clientX === prevXRef.current) return;
        isPrev = clientX > prevXRef.current; // touch swipe right
      }
      if (direction === "vertical") {
        if (clientY === prevYRef.current) return;
        isPrev = clientY > prevYRef.current; // touch swipe bottom
      }

      if (isPrev) {
        handlePrev();
      } else {
        handleNext();
      }
    };

    if (!slides.length) return null;

    return (
      <div className={clsx(styles.container, styles[direction], containerClassName)}>
        {showArrows && (
          <button
            className={clsx(styles.nav, styles.prev, arrowClassName, prevClassName)}
            onClick={handlePrev}
          >
            <AngleDownSVG />
          </button>
        )}

        <div
          className={clsx(styles.viewport, viewportClassName)}
          style={{
            width: `${width}px`,
            maxWidth: `${width}px`,
            height: `${height}px`,
            maxHeight: `${height}px`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className={clsx(styles.list, listClasName)}
            style={{ gap: `${slidesGap}px` }}
            ref={listRef}
          >
            {slides.map(({ id, render }) => {
              const isCurrent = id === current;

              return (
                <React.Fragment key={id}>
                  {render({ id, className: styles.slide, current: isCurrent })}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {showArrows && (
          <button
            className={clsx(styles.nav, styles.next, arrowClassName, nextClassName)}
            onClick={handleNext}
          >
            <AngleDownSVG />
          </button>
        )}
      </div>
    );
  },
);
